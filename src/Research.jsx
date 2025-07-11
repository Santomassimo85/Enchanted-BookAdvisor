import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToFavorites, addToCart } from "./LibrarySlice";
import { toast } from "react-toastify";
import "./components/styles/search.css";

/**
 * Search component that allows users to search for books using OpenLibrary,
 * add them to favorites or cart, and view details.
 *
 * @component
 */
function Search() {
  const location = useLocation();
  // State for the search query, initialized from location state if available
  const [query, setQuery] = useState(location.state?.restoredQuery ?? "");
  // State for the list of books returned from the API
  const [books, setBooks] = useState([]);
  // State for loading indicator
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // State to disable favorites and cart buttons after adding
  const [disabledFavorites, setDisabledFavorites] = useState([]);
  const [disabledCart, setDisabledCart] = useState([]);
  // State to manage expanded/collapsed book descriptions
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  /**
   * Effect to fetch books from OpenLibrary API when the query changes.
   * Only triggers if the query length is at least 3 characters.
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
            if (!response.ok)
              throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();

            // Simulate a short delay for UX
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
   * Extracts the description from a book object.
   * @param {Object} book - The book object.
   * @returns {string|undefined} The description or first sentence.
   */
  const extractDescription = (book) =>
    book.description ??
    (typeof book.first_sentence === "object"
      ? book.first_sentence?.value
      : book.first_sentence);

  /**
   * Handles adding a book to favorites.
   * @param {Object} book - The book object.
   */
  const handleAddToFavorites = (book) => {
    dispatch(
      addToFavorites({
        ...book,
        description: extractDescription(book),
      })
    );
    setDisabledFavorites((prev) => [...prev, book.key]);
    toast.success(`✅ Added "${book.title}" to Favorites!`);
  };

  /**
   * Handles adding a book to the cart.
   * @param {Object} book - The book object.
   */
  const handleAddToCart = (book) => {
    dispatch(
      addToCart({
        ...book,
        description: extractDescription(book),
      })
    );
    setDisabledCart((prev) => [...prev, book.key]);
    toast.success(`✅ Added "${book.title}" to Cart!`);
  };

  /**
   * Toggles the expanded/collapsed state of a book's description.
   * @param {string} bookId - The book's key.
   */
  const toggleDescription = (bookId) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [bookId]: !prev[bookId],
    }));
  };

  return (
    <div className="search-container">
      <h2>Search for a Book</h2>

      <div className="search-box">
        {/* Input for search query */}
        <input
          type="text"
          placeholder="e.g. The Hobbit"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Loading indicator */}
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

      {/* Results grid */}
      <div className="results-grid">
        {books.map((book) => (
          <div className="book-card" key={book.key}>
            {/* Book cover or placeholder */}
            {book.cover_i ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={`${book.title} cover`}
                className="book-cover"
              />
            ) : (
              <div className="no-cover">No cover</div>
            )}

            {/* Book info */}
            <div className="book-info">
              <h3>{book.title}</h3>
              <p>
                <em>{book.author_name?.[0] ?? "Unknown Author"}</em>
              </p>
              <p className="book-id">
                📚 <small>ID: {book.key.split("/").pop()}</small>
              </p>
            </div>

            {/* Toggle description link */}
            <p
              className="toggle-description"
              onClick={() => toggleDescription(book.key)}
            >
              {expandedDescriptions[book.key]
                ? "Close the description"
                : "Show description"}
            </p>

            {/* Book description */}
            <div
              className={`book-description-wrapper ${
                expandedDescriptions[book.key] ? "open" : ""
              }`}
            >
              <p className="book-description">
                {extractDescription(book) ?? "No description available."}
              </p>
            </div>

            {/* Action buttons */}
            <div className="book-buttons">
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
