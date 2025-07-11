// BookDetails.jsx
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { saveReview } from "../LibrarySlice";
import "./styles/bookDetails.css";

/**
 * Component that fetches and displays details of a book from OpenLibrary
 * and allows the user to rate and comment.
 */
function BookDetails() {
  const { id } = useParams(); // OpenLibrary Work ID (e.g. OL12345W)
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { bookTitle, coverId } = location.state || {};

  const review = useSelector(
    (state) =>
      state.library.reviews[id] || {
        rating: 0,
        comment: "",
        cover_i: coverId ?? null,
        title: bookTitle ?? "",
      }
  );

  const [book, setBook] = useState({
    title: bookTitle ?? "Loading...",
    description: "Loading description...",
  });

  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);

  /**
   * Fetches the full book details (description) from OpenLibrary.
   */
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`https://openlibrary.org/works/${id}.json`);
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const data = await res.json();

        const description =
          typeof data.description === "object"
            ? data.description.value
            : typeof data.description === "string"
            ? data.description
            : "No description available.";

        setBook({
          title: data.title ?? bookTitle ?? "Unknown Title",
          description,
        });
      } catch (err) {
        console.error("Failed to load book details:", err);
        setBook({
          title: bookTitle ?? "Unknown Title",
          description: "No description available.",
        });
      }
    };

    fetchDetails();
  }, [id, bookTitle]);

  /**
   * Handles star rating selection.
   * @param {number} value
   */
  const handleRating = (value) => {
    setRating(value);
  };

  /**
   * Submits the review to Redux and returns to Search.
   * @param {Event} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      saveReview({
        bookId: id,
        rating,
        comment,
        cover_i: coverId,
        title: book.title,
      })
    );
    toast.success("✅ Review saved!");

    setTimeout(() => {
      navigate("/search", {
        state: {
          restoredQuery: book.title ?? "",
        },
      });
    }, 500);
  };

  return (
    <div className="book-details-container">
      <h2>{book.title}</h2>

      {coverId ? (
        <img
          src={`https://covers.openlibrary.org/b/id/${coverId}-M.jpg`}
          alt={`${book.title} cover`}
          className="book-cover-detail"
        />
      ) : (
        <div className="no-cover-detail">No cover available</div>
      )}

      <p>
        <strong>Description:</strong> {book.description}
      </p>

      <div className="rating-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= rating ? "star selected" : "star"}
            onClick={() => handleRating(star)}
          >
            ★
          </span>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="comment">Leave a comment:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="What did you think about this book?"
        />
        <button type="submit">Save Review</button>
      </form>
    </div>
  );
}

export default BookDetails;
