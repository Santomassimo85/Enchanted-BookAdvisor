import { useSelector, useDispatch } from "react-redux";
import { removeFromFavorites } from "./LibrarySlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./components/styles/library.css";
import "./components/styles/transition.css";

function Library() {
  const favorites = useSelector((state) => state.library.favorites);
  const dispatch = useDispatch();

  const handleRemove = (key) => {
    const book = favorites.find((b) => b.key === key);
    dispatch(removeFromFavorites(key));
    toast.error(`❌ Removed "${book?.title}" from Favorites`);
  };

  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const toggleDescription = (bookId) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [bookId]: !prev[bookId],
    }));
  };

  const handleClearAll = () => {
    favorites.forEach((book) => {
      dispatch(removeFromFavorites(book.key));
    });
    toast.error("❌ All favorites cleared!");
  };

  return (
    <div className="library-container">
      <h2>My Favorite Books</h2>

      {favorites.length === 0 ? (
        <p>No favorites yet. Start exploring the library!</p>
      ) : (
        <>
          <button className="clear-btn" onClick={handleClearAll}>
            Clear All
          </button>

          <div className="favorites-list results-grid">
            {favorites.map((book) => (
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

export default Library;
