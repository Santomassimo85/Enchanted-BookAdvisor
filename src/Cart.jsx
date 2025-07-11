import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "./LibrarySlice";
import { toast } from 'react-toastify';
import "./components/styles/cart.css";
import './components/styles/transition.css';

function Cart() {
  const cart = useSelector((state) => state.library.cart);
  const dispatch = useDispatch();

 const handleRemove = (key) => {
  const book = cart.find(b => b.key === key);
  dispatch(removeFromCart(key));
  toast.error(`❌ Removed "${book?.title}" from Cart`);
};


  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="cart-container">
      <h2>My Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty. Go add some magical books!</p>
      ) : (
        <>
          <button className="clear-btn" onClick={handleClearCart}>
            🗑️ Clear Cart
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
