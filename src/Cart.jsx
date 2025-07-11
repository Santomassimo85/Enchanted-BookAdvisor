import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "./LibrarySlice";
import { toast } from "react-toastify";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./components/styles/cart.css";
import "./components/styles/transition.css";

function Cart() {
  const cart = useSelector((state) => state.library.cart);
  const dispatch = useDispatch();
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const handleRemove = (key) => {
    const book = cart.find((b) => b.key === key);
    dispatch(removeFromCart(key));
    toast.error(`Removed "${book?.title}" from Cart`);
  };


  const toggleDescription = (bookId) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [bookId]: !prev[bookId],
    }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.error("Cart cleared");
  };

  return (
    <div className="cart-container">
      <h2>Borrowed Books</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty. Go add some magical books!</p>
      ) : (
        <>
          <button className="clear-btn" onClick={handleClearCart}>
            Clear Cart
          </button>

          <div className="cart-list results-grid">
            {cart.map((book) => (
              <div className="book-card" key={book.key}>
                {book.cover_i ? (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                    alt={`${book.title} cover`}
                    className="book-cover"
                  />
                ) : (
                  <div className="no-cover">No cover</div>
                )}

                <h3>{book.title}</h3>
                <p>
                  <em>{book.author_name?.[0] ?? "Unknown Author"}</em>
                </p>

                <p
                  className="toggle-description"
                  onClick={() => toggleDescription(book.key)}
                >
                  {expandedDescriptions[book.key]
                    ? "Close the description"
                    : "Show description"}
                </p>

                {expandedDescriptions[book.key] && (
                  <div className="book-description-wrapper open">
                    <p className="book-description">
                      {book.description ?? "No description available."}
                    </p>
                  </div>
                )}

                <Link
                  to={`/book/${book.key.split("/").pop()}`}
                  state={{
                    bookTitle: book.title,
                    coverId: book.cover_i,
                    from: location.pathname,
                  }}
                >
                  <button className="btn small">Add Review</button>
                </Link>

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
