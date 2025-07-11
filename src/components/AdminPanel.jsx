import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { saveReview, removeReview, clearReviews } from "../LibrarySlice";
import { toast } from "react-toastify";
import "./styles/admin.css";

/**
 * AdminPanel component for managing book reviews, favorites, and cart.
 * Allows editing, deleting, and clearing reviews, as well as editing book details.
 * @component
 */
function AdminPanel() {
    // Get reviews, favorites, and cart from Redux store
    const reviews = useSelector((state) => state.library.reviews);
    const favorites = useSelector((state) => state.library.favorites);
    const cart = useSelector((state) => state.library.cart);
    const dispatch = useDispatch();

    // State for editing review description
    const [editingReview, setEditingReview] = useState(null);
    const [newDescription, setNewDescription] = useState("");

    // State for editing book data by ID
    const [selectedBookId, setSelectedBookId] = useState("");
    const [editBookData, setEditBookData] = useState({ title: "", description: "", cover_i: "" });

    /**
     * Start editing the description of a review.
     * @param {string} bookId - The ID of the book to edit.
     */
    const handleEditDescription = (bookId) => {
        const review = reviews[bookId];
        setEditingReview(bookId);
        setNewDescription(review?.description || "");
    };

    /**
     * Save the edited description for a review.
     * @param {string} bookId - The ID of the book to save.
     */
    const handleSaveDescription = (bookId) => {
        const existingReview = reviews[bookId];
        const bookData =
            favorites.find((book) => book.key.split("/").pop() === bookId) ||
            cart.find((book) => book.key.split("/").pop() === bookId);

        dispatch(
            saveReview({
                bookId,
                rating: existingReview?.rating || 0,
                comment: existingReview?.comment || "",
                cover_i: existingReview?.cover_i || bookData?.cover_i,
                title: existingReview?.title || bookData?.title,
                description: newDescription,
            })
        );

        setEditingReview(null);
        setNewDescription("");
        toast.success("Description updated successfully!");
    };

    /**
     * Delete a review by book ID.
     * @param {string} bookId - The ID of the book to delete.
     */
    const handleDeleteReview = (bookId) => {
        dispatch(removeReview(bookId));
        toast.success("Review deleted successfully!");
    };

    /**
     * Clear all reviews after confirmation.
     */
    const handleClearAllReviews = () => {
        if (window.confirm("Are you sure you want to clear all reviews?")) {
            dispatch(clearReviews());
            toast.success("All reviews cleared!");
        }
    };

    // Convert reviews object to array for rendering
    const reviewsArray = Object.entries(reviews);

    return (
        <div className="admin-panel">
            <div className="admin-header">
                <h2>👑 Admin Panel</h2>
                <p>Manage book descriptions and reviews</p>
            </div>

            {/* Statistics section */}
            <div className="admin-stats">
                <div className="stat-card">
                    <h3>Statistics</h3>
                    <p>
                        Total Reviews: <strong>{reviewsArray.length}</strong>
                    </p>
                    <p>
                        Books in Favorites: <strong>{favorites.length}</strong>
                    </p>
                    <p>
                        Books in Cart: <strong>{cart.length}</strong>
                    </p>
                </div>
            </div>

            {/* Button to clear all reviews */}
            <div className="admin-actions">
                <button
                    className="danger-btn"
                    onClick={handleClearAllReviews}
                    disabled={reviewsArray.length === 0}
                >
                    Clear All Reviews
                </button>
            </div>

            {/* Book editor section */}
            <div className="book-editor">
                <h3>Edit Book</h3>
                <input
                    type="text"
                    placeholder="Enter Book ID (e.g. OL12345W)"
                    value={selectedBookId}
                    onChange={(e) => setSelectedBookId(e.target.value)}
                />
                <button
                    onClick={() => {
                        const bookId = selectedBookId;
                        const review = reviews[bookId];
                        const book =
                            favorites.find((b) => b.key.split("/").pop() === bookId) ||
                            cart.find((b) => b.key.split("/").pop() === bookId);

                        if (review || book) {
                            setEditBookData({
                                title: review?.title || book?.title || "",
                                description: review?.description || book?.description || "",
                                cover_i: review?.cover_i || book?.cover_i || "",
                            });
                        } else {
                            toast.error("❌ Book not found in favorites/cart/reviews.");
                        }
                    }}
                >
                    Load Book
                </button>

                {/* Form to edit book details */}
                {editBookData.title && (
                    <div className="edit-book-form">
                        <input
                            type="text"
                            placeholder="Title"
                            value={editBookData.title}
                            onChange={(e) =>
                                setEditBookData({ ...editBookData, title: e.target.value })
                            }
                        />
                        <textarea
                            placeholder="Description"
                            rows={4}
                            value={editBookData.description}
                            onChange={(e) =>
                                setEditBookData({ ...editBookData, description: e.target.value })
                            }
                        />
                        <input
                            type="text"
                            placeholder="Cover ID"
                            value={editBookData.cover_i}
                            onChange={(e) =>
                                setEditBookData({ ...editBookData, cover_i: e.target.value })
                            }
                        />
                        <button
                            onClick={() => {
                                dispatch(
                                    saveReview({
                                        bookId: selectedBookId,
                                        rating: reviews[selectedBookId]?.rating || 0,
                                        comment: reviews[selectedBookId]?.comment || "",
                                        title: editBookData.title,
                                        description: editBookData.description,
                                        cover_i: editBookData.cover_i,
                                    })
                                );
                                toast.success("✅ Book updated!");
                            }}
                        >
                            Save Changes
                        </button>
                        <button
                            className="danger-btn"
                            onClick={() => {
                                dispatch(removeReview(selectedBookId));
                                toast.success("Book deleted from reviews!");
                            }}
                        >
                            ❌ Delete Book Review
                        </button>
                    </div>
                )}
            </div>

            {/* Reviews management section */}
            <div className="reviews-management">
                <h3>Reviews Management</h3>

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
                                            Edit
                                        </button>
                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDeleteReview(bookId)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>

                                <div className="review-content">
                                    {/* Show rating if available */}
                                    {review.rating > 0 && (
                                        <p>
                                            <strong>Rating:</strong> {"⭐".repeat(review.rating)}
                                        </p>
                                    )}

                                    {/* Show comment if available */}
                                    {review.comment && (
                                        <p>
                                            <strong>Comment:</strong> {review.comment}
                                        </p>
                                    )}

                                    {/* Description section with edit functionality */}
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
                                                        Save
                                                    </button>
                                                    <button
                                                        className="cancel-btn"
                                                        onClick={() => {
                                                            setEditingReview(null);
                                                            setNewDescription("");
                                                        }}
                                                    >
                                                        Cancel
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