import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "./LibrarySlice";
import { toast } from "react-toastify";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./components/styles/cart.css";
import "./components/styles/transition.css";

/**
 * Cart component displays the list of borrowed books.
 * Allows users to remove books, clear the cart, and add reviews.
 * @component
 */
function Cart() {
  // Get the cart array from Redux store
  const cart = useSelector((state) => state.library.cart);
  const dispatch = useDispatch();
  // State to track which book descriptions are expanded
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  // Get current location for navigation state
  const location = useLocation();

  /**
   * Removes a book from the cart and shows a toast notification.
   * @param {string} key - The unique key of the book to remove.
   */
  const handleRemove = (key) => {
    const book = cart.find((b) => b.key === key);
    dispatch(removeFromCart(key));
    toast.error(`Removed "${book?.title}" from Cart`);
  };

  /**
   * Toggles the expanded/collapsed state of a book's description.
   * @param {string} bookId - The unique key of the book.
   */
  const toggleDescription = (bookId) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [bookId]: !prev[bookId],
    }));
  };

  /**
   * Clears all books from the cart and shows a toast notification.
   */
  const handleClearCart = () => {
    dispatch(clearCart());
    toast.error("Cart cleared");
  };

  return (
    <div className="cart-container">
      <h2>Borrowed Books</h2>

      {/* Show message if cart is empty */}
      {cart.length === 0 ? (
        <p>Your cart is empty. Go add some magical books!</p>
      ) : (
        <>
          {/* Button to clear the entire cart */}
          <button className="clear-btn" onClick={handleClearCart}>
            Clear Cart
          </button>

          <div className="cart-list results-grid">
            {/* Render each book in the cart */}
            {cart.map((book) => (
              <div className="book-card" key={book.key}>
                {/* Book cover image or placeholder */}
                {book.cover_i ? (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                    alt={`${book.title} cover`}
                    className="book-cover"
                  />
                ) : (
                  <div className="no-cover">No cover</div>
                )}

                {/* Book title */}
                <h3>{book.title}</h3>
                <p>
                  <span className="book-id">
                    <small>ID: {book.key.split("/").pop()}</small>
                  </span>
                  <em>{book.author_name?.[0] ?? "Unknown Author"}</em>
                </p>

                {/* Toggle description link */}
                <p
                  className="toggle-description"
                  onClick={() => toggleDescription(book.key)}
                >
                  {expandedDescriptions[book.key]
                    ? "Close the description"
                    : "Show description"}
                </p>

                {/* Book description, shown if expanded */}
                {expandedDescriptions[book.key] && (
                  <div className="book-description-wrapper open">
                    <p className="book-description">
                      {book.description ?? "No description available."}
                    </p>
                  </div>
                )}

                {/* Link to add a review for the book */}
                <Link
                  to={`/home/book/${book.key.split("/").pop()}`}
                  state={{
                    bookTitle: book.title,
                    coverId: book.cover_i,
                    from: location.pathname,
                  }}
                >
                  <button className="btn small">Add Review</button>
                </Link>

                {/* Button to remove the book from the cart */}
                <button onClick={() => handleRemove(book.key)}>
                  ❌ Remove
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
