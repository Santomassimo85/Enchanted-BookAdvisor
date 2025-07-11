import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToFavorites, addToCart } from "./LibrarySlice";
import { toast } from "react-toastify";
import "./components/styles/search.css";

/**
 * Search component that allows users to search books from OpenLibrary,
 * add them to favorites or cart, and view details.
 * Includes debounced input, loading indicator, and toast notifications.
 *
 * @component
 */
function Search() {
  const location = useLocation();
  const [query, setQuery] = useState(location.state?.restoredQuery ?? "");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [disabledFavorites, setDisabledFavorites] = useState([]);
  const [disabledCart, setDisabledCart] = useState([]);

  /**
   * Fetch books from OpenLibrary based on the query.
   * Uses debounce to delay fetch by 500ms after typing stops.
   */
  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.length >= 3) {
        const fetchBooks = async () => {
          setLoading(true);
          try {
            const response = await fetch(
              `https://openlibrary.org/search.json?q=${encodeURIComponent(
                query
              )}`
            );

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Simulated loading delay for UI polish
            setTimeout(() => {
              setBooks(data.docs.slice(0, 10));
              setLoading(false);
            }, 100);
          } catch (error) {
            console.error("Fetch error:", error);
            toast.error("📚 Failed to load books. Please try again.");
            setLoading(false);
          }
        };

        fetchBooks();
      } else {
        setBooks([]);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [query]);

  /**
   * Adds the specified book to the favorites list, disables the favorites button for that book,
   * and displays a success toast notification.
   *
   * @param {Object} book - The book object to add to favorites.
   * @param {string} book.key - Unique identifier for the book.
   * @param {string} book.title - Title of the book.
   */
  const handleAddToFavorites = (book) => {
    dispatch(addToFavorites(book));
    setDisabledFavorites((prev) => [...prev, book.key]);
    toast.success(`✅ Added "${book.title}" to Favorites!`);
  };

  /**
   * Handles adding a book to the cart.
   * Dispatches an action to add the book, disables the cart button for the book,
   * and shows a success toast notification.
   *
   * @param {Object} book - The book object to add to the cart.
   * @param {string} book.key - Unique identifier for the book.
   * @param {string} book.title - Title of the book.
   */
  const handleAddToCart = (book) => {
    dispatch(addToCart(book));
    setDisabledCart((prev) => [...prev, book.key]);
    toast.success(`✅ Added "${book.title}" to Cart!`);
  };

  return (
    <div className="search-container">
      
      <h2>Search for a Book</h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="e.g. The Hobbit"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading && (
        <div className="gif-loader-wrapper">
          <img
            src="/images/__Run.gif"
            alt="Warrior walking with torch"
            className="gif-loader"
          />
          <p className="loader-text">Venturing into the dark archives...</p>
        </div>
      )}

      <div className="results-grid">
        {books.map((book) => (
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

            <div className="book-info">
              <h3>{book.title}</h3>
              <p>
                <em>{book.author_name?.[0] ?? "Unknown Author"}</em>
              </p>
            </div>

            <div className="book-buttons">
              <Link
                to={`/book/${book.key.split("/").pop()}`}
                state={{ bookTitle: book.title, coverId: book.cover_i }}
              >
                <button className="btn small">Details</button>
              </Link>
              <button
                className="btn small"
                onClick={() => handleAddToFavorites(book)}
                disabled={disabledFavorites.includes(book.key)}
              >
                ❤️
              </button>

              <button
                className="btn small"
                onClick={() => handleAddToCart(book)}
                disabled={disabledCart.includes(book.key)}
              >
                Borrow
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
