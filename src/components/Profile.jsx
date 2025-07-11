// Profile.jsx
import { useSelector, useDispatch } from "react-redux";
import { removeReview, clearReviews, submitSiteFeedback } from "../LibrarySlice";
import { toast } from "react-toastify";
import { useState } from "react";
import "./styles/profile.css";

/**
 * Profile page component.
 * Displays user reviews, allows removing individual reviews,
 * clearing all reviews, toggling book description visibility,
 * and submitting site feedback (for non-admin users).
 *
 * @component
 */
function Profile() {
  // Get reviews, admin status, and feedback status from Redux store
  const reviews = useSelector((state) => state.library.reviews);
  const isAdmin = useSelector((state) => state.library.isAdmin);
  const feedbackStatus = useSelector((state) => state.library.feedbackStatus);
  const dispatch = useDispatch();

  // State for expanded book descriptions
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  // State for feedback form
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Convert reviews object to array for rendering
  const reviewList = Object.entries(reviews); // [[bookId, reviewObj]]

  /**
   * Remove a single review by bookId.
   * @param {string} bookId - The ID of the book to remove review for.
   */
  const handleRemove = (bookId) => {
    dispatch(removeReview(bookId));
    toast.error("Review removed!");
  };

  /**
   * Clear all reviews.
   */
  const handleClearAll = () => {
    dispatch(clearReviews());
    toast.error("All reviews cleared!");
  };

  /**
   * Toggle the visibility of a book's description.
   * @param {string} bookId - The ID of the book to toggle description for.
   */
  const toggleDescription = (bookId) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [bookId]: !prev[bookId],
    }));
  };

  /**
   * Handle feedback form submission.
   * @param {React.FormEvent} e - The form submit event.
   */
  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a rating.");
      return;
    }

    try {
      await dispatch(submitSiteFeedback({ rating, comment })).unwrap();
      toast.success("🎉 Thank you for your feedback!");
      setFeedbackSubmitted(true);
    } catch {
      toast.error("Failed to send feedback.");
    }
  };

  return (
    <div className="profile-container">
      <h2>My Library Reviews</h2>

      {/* Show message if no reviews, else show review list */}
      {reviewList.length === 0 ? (
        <p>No reviews yet. Start your adventure!</p>
      ) : (
        <>
          {/* Button to clear all reviews */}
          <button className="clear-btn" onClick={handleClearAll}>
            Clear All Reviews
          </button>

          <div className="review-list">
            {/* Render each review card */}
            {reviewList.map(
              ([bookId, { rating, comment, cover_i, title, description }]) => (
                <div key={bookId} className="review-card">
                  <div className="review-layout">
                    {/* Book cover image or placeholder */}
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
                      <p className="book-id"><small>ID: {bookId}</small></p>
                      <p className="review-rating">⭐ {rating} / 5</p>
                      <p className="review-comment"><em>{comment}</em></p>

                      {/* Button to remove individual review */}
                      <button onClick={() => handleRemove(bookId)}>
                        Remove
                      </button>

                      {/* Toggle book description */}
                      <p
                        className="toggle-description"
                        onClick={() => toggleDescription(bookId)}
                      >
                        {expandedDescriptions[bookId]
                          ? "Hide description"
                          : "Show description"}
                      </p>

                      {/* Book description, shown if expanded */}
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

      {/* Feedback form for non-admin users */}
      {!isAdmin && (
        <div className="feedback-form">
          {feedbackSubmitted ? (
            <p className="thank-you-message">🙏 Thank you for your feedback!</p>
          ) : (
            <>
              <h3>📝 Share your thoughts</h3>
              <p>How do you rate your experience with Enchanted Book Advisor?</p>

              {/* Star rating input */}
              <div className="stars-input">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setRating(star)}
                    className={star <= rating ? "star selected" : "star"}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Feedback form */}
              <form onSubmit={handleSubmitFeedback}>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Leave a comment..."
                  rows={4}
                />

                {/* Show loading spinner if feedback is being sent */}
                {feedbackStatus === "loading" ? (
                  <button type="button" className="btn" disabled>
                    <span className="spinner"></span> Sending...
                  </button>
                ) : (
                  <button type="submit" className="btn">Submit Feedback</button>
                )}
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;
