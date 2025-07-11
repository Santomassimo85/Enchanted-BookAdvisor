import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { saveReview, removeReview, clearReviews } from "../LibrarySlice";
import { toast } from "react-toastify";
import "./styles/admin.css";

function AdminPanel() {
  const reviews = useSelector((state) => state.library.reviews);
  const favorites = useSelector((state) => state.library.favorites);
  const cart = useSelector((state) => state.library.cart);
  const dispatch = useDispatch();

  const [selectedBook, setSelectedBook] = useState(null);
  const [editingReview, setEditingReview] = useState(null);
  const [newDescription, setNewDescription] = useState("");

  const handleEditDescription = (bookId) => {
    const review = reviews[bookId];
    setEditingReview(bookId);
    setNewDescription(review?.description || "");
  };

  const handleSaveDescription = (bookId) => {
    const existingReview = reviews[bookId];
    const bookData = favorites.find(book => book.key.split('/').pop() === bookId) || 
                    cart.find(book => book.key.split('/').pop() === bookId);

    dispatch(saveReview({
      bookId,
      rating: existingReview?.rating || 0,
      comment: existingReview?.comment || "",
      cover_i: existingReview?.cover_i || bookData?.cover_i,
      title: existingReview?.title || bookData?.title,
      description: newDescription
    }));

    setEditingReview(null);
    setNewDescription("");
    toast.success("Description updated successfully!");
  };

  const handleDeleteReview = (bookId) => {
    dispatch(removeReview(bookId));
    toast.success("Review deleted successfully!");
  };

  const handleClearAllReviews = () => {
    if (window.confirm("Are you sure you want to clear all reviews?")) {
      dispatch(clearReviews());
      toast.success("All reviews cleared!");
    }
  };

  const reviewsArray = Object.entries(reviews);

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h2>👑 Admin Panel</h2>
        <p>Manage book descriptions and reviews</p>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <h3>📊 Statistics</h3>
          <p>Total Reviews: <strong>{reviewsArray.length}</strong></p>
          <p>Books in Favorites: <strong>{favorites.length}</strong></p>
          <p>Books in Cart: <strong>{cart.length}</strong></p>
        </div>
      </div>

      <div className="admin-actions">
        <button 
          className="danger-btn" 
          onClick={handleClearAllReviews}
          disabled={reviewsArray.length === 0}
        >
          🗑️ Clear All Reviews
        </button>
      </div>

      <div className="reviews-management">
        <h3>📝 Reviews Management</h3>
        
        {reviewsArray.length === 0 ? (
          <p className="no-reviews">No reviews available to manage.</p>
        ) : (
          <div className="reviews-grid">
            {reviewsArray.map(([bookId, review]) => (
              <div key={bookId} className="review-card">
                <div className="review-header">
                  <h4>{review.title || `Book ID: ${bookId}`}</h4>
                  <div className="review-actions">
                    <button 
                      className="edit-btn"
                      onClick={() => handleEditDescription(bookId)}
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteReview(bookId)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>

                <div className="review-content">
                  {review.rating > 0 && (
                    <p><strong>Rating:</strong> {"⭐".repeat(review.rating)}</p>
                  )}
                  
                  {review.comment && (
                    <p><strong>Comment:</strong> {review.comment}</p>
                  )}

                  <div className="description-section">
                    <strong>Description:</strong>
                    {editingReview === bookId ? (
                      <div className="edit-form">
                        <textarea
                          value={newDescription}
                          onChange={(e) => setNewDescription(e.target.value)}
                          placeholder="Enter book description..."
                          rows="4"
                        />
                        <div className="edit-buttons">
                          <button 
                            className="save-btn"
                            onClick={() => handleSaveDescription(bookId)}
                          >
                            💾 Save
                          </button>
                          <button 
                            className="cancel-btn"
                            onClick={() => {
                              setEditingReview(null);
                              setNewDescription("");
                            }}
                          >
                            ❌ Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="description-text">
                        {review.description || "No description available"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;