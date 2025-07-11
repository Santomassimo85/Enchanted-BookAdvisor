import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToFavorites, addToCart } from "./LibrarySlice";
import { toast } from "react-toastify";
import "./components/styles/search.css";

/**
 * Search component that allows users to search books from OpenLibrary,
 * add them to favorites or cart, and view details.
 */
function Search() {
  const location = useLocation();
  const [query, setQuery] = useState(location.state?.restoredQuery ?? "");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [disabledFavorites, setDisabledFavorites] = useState([]);
  const [disabledCart, setDisabledCart] = useState([]);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.length >= 3) {
        const fetchBooks = async () => {
          setLoading(true);
          try {
            const response = await fetch(
              `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
            );
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();

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

  const extractDescription = (book) =>
    book.description ??
    (typeof book.first_sentence === "object"
      ? book.first_sentence?.value
      : book.first_sentence);

  const handleAddToFavorites = (book) => {
    dispatch(addToFavorites({
      ...book,
      description: extractDescription(book),
    }));
    setDisabledFavorites((prev) => [...prev, book.key]);
    toast.success(`✅ Added "${book.title}" to Favorites!`);
  };

  const handleAddToCart = (book) => {
    dispatch(addToCart({
      ...book,
      description: extractDescription(book),
    }));
    setDisabledCart((prev) => [...prev, book.key]);
    toast.success(`✅ Added "${book.title}" to Cart!`);
  };

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
              <p><em>{book.author_name?.[0] ?? "Unknown Author"}</em></p>
            </div>

            <p
              className="toggle-description"
              onClick={() => toggleDescription(book.key)}
            >
              {expandedDescriptions[book.key]
                ? "Close the description"
                : "Show description"}
            </p>

            <div className={`book-description-wrapper ${expandedDescriptions[book.key] ? "open" : ""}`}>
              <p className="book-description">
                {extractDescription(book) ?? "No description available."}
              </p>
            </div>

            <div className="book-buttons">
              <Link
                to={`/book/${book.key.split("/").pop()}`}
                state={{ bookTitle: book.title, coverId: book.cover_i }}
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
