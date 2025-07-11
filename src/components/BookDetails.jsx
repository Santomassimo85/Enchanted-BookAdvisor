// BookDetails.jsx
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { saveReview } from "../LibrarySlice";
import "./styles/bookDetails.css";

/**
 * BookDetails component
 * Fetches and displays details of a book from OpenLibrary.
 * Allows the user to rate and comment on the book.
 *
 * @component
 */
function BookDetails() {
  // Get the book ID from the URL parameters
  const { id } = useParams(); // OpenLibrary Work ID (e.g. OL12345W)
  // Get location and navigation helpers from React Router
  const location = useLocation();
  const navigate = useNavigate();
  // Redux dispatch function
  const dispatch = useDispatch();

  // Extract book title and cover ID from location state (passed from previous page)
  const { bookTitle, coverId } = location.state || {};

  // Get the review for this book from Redux, or set default values
  const review = useSelector(
    (state) =>
      state.library.reviews[id] || {
        rating: 0,
        comment: "",
        cover_i: coverId ?? null,
        title: bookTitle ?? "",
      }
  );

  // Local state for book details
  const [book, setBook] = useState({
    title: bookTitle ?? "Loading...",
    description: "Loading description...",
  });

  // Local state for rating and comment
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);

  /**
   * Fetches the full book details (description) from OpenLibrary API.
   * Updates the local book state.
   */
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`https://openlibrary.org/works/${id}.json`);
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const data = await res.json();

        // Handle description format (string or object)
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
   * @param {number} value - The selected rating value
   */
  const handleRating = (value) => {
    setRating(value);
  };

  /**
   * Submits the review to Redux and navigates back to Search.
   * @param {React.FormEvent} e - The form submit event
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
        description: book.description
      })
    );
    toast.success("✅ Review saved!");

    // Navigate back to search after a short delay
    setTimeout(() => {
      navigate(location.state?.from ?? "/search", {
        state: {
          restoredQuery: book.title ?? "",
        },
      });
    }, 500);
  };

  return (
    <div className="book-details-container">
      <h2>{book.title}</h2>

      {/* Show book cover if available */}
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

      {/* Star rating selection */}
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

      {/* Review form */}
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
