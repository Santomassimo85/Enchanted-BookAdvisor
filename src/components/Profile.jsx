// Profile.jsx
import { useSelector, useDispatch } from "react-redux";
import { removeReview, clearReviews } from "../LibrarySlice";
import { toast } from "react-toastify";
import { useState } from "react";
import "./styles/profile.css";

/**
 * Profile page that displays user reviews.
 * Allows removing single reviews, clearing all,
 * and toggling book description visibility.
 */
function Profile() {
  const reviews = useSelector((state) => state.library.reviews);
  const dispatch = useDispatch();
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const reviewList = Object.entries(reviews); // [[bookId, reviewObj]]

  const handleRemove = (bookId) => {
    dispatch(removeReview(bookId));
    toast.error("❌ Review removed!");
  };

  const handleClearAll = () => {
    dispatch(clearReviews());
    toast.error("🧹 All reviews cleared!");
  };

  const toggleDescription = (bookId) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [bookId]: !prev[bookId],
    }));
  };

  return (
    <div className="profile-container">
      <h2>My Library Reviews</h2>

      {reviewList.length === 0 ? (
        <p>No reviews yet. Start your adventure!</p>
      ) : (
        <>
          <button className="clear-btn" onClick={handleClearAll}>
            Clear All Reviews
          </button>

          <div className="review-list">
            {reviewList.map(
              ([bookId, { rating, comment, cover_i, title, description }]) => (
                <div key={bookId} className="review-card">
                  <div className="review-layout">
                    {cover_i ? (
                      <img
                        src={`https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`}
                        alt={`${title || "Book"} cover`}
                        className="review-cover"
                      />
                    ) : (
                      <div className="no-cover">No cover</div>
                    )}

                    <div className="review-info">
                      <h3>{title || `ID: ${bookId}`}</h3>
                      <p className="review-rating">⭐ {rating} / 5</p>
                      <p className="review-comment">
                        <em>{comment}</em>
                      </p>

                      <button onClick={() => handleRemove(bookId)}>
                        Remove
                      </button>

                      <p
                        className="toggle-description"
                        onClick={() => toggleDescription(bookId)}
                      >
                        {expandedDescriptions[bookId]
                          ? "Hide description"
                          : "Show description"}
                      </p>

                      <div
                        className={`book-description-wrapper ${
                          expandedDescriptions[bookId] ? "open" : ""
                        }`}
                      >
                        <p className="book-description">
                          {description ?? "No description available."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
