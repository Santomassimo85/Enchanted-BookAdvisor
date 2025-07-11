import { useSelector, useDispatch } from "react-redux";
import { removeFromFavorites, saveReview } from "./LibrarySlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./components/styles/library.css";
import "./components/styles/transition.css";

/**
 * Library component displays the user's favorite books.
 * Allows removing books, clearing all favorites, and editing book details for admins.
 * @component
 */
function Library() {
  // Get favorite books and admin status from Redux store
  const favorites = useSelector((state) => state.library.favorites);
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.library.isAdmin);

  /**
   * Removes a book from favorites and shows a toast notification.
   * @param {string} key - The unique key of the book to remove.
   */
  const handleRemove = (key) => {
    const book = favorites.find((b) => b.key === key);
    dispatch(removeFromFavorites(key));
    toast.error(`Removed "${book?.title}" from Favorites`);
  };

  // State to track which book descriptions are expanded
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  /**
   * Toggles the expanded state of a book's description.
   * @param {string} bookId - The unique key of the book.
   */
  const toggleDescription = (bookId) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [bookId]: !prev[bookId],
    }));
  };

  /**
   * Removes all books from favorites and shows a toast notification.
   */
  const handleClearAll = () => {
    favorites.forEach((book) => {
      dispatch(removeFromFavorites(book.key));
    });
    toast.error("All favorites cleared!");
  };

  return (
    <div className="library-container">
      <h2>My Favorite Books</h2>

      {favorites.length === 0 ? (
        <p>No favorites yet. Start exploring the library!</p>
      ) : (
        <>
          {/* Button to clear all favorite books */}
          <button className="clear-btn" onClick={handleClearAll}>
            Clear All
          </button>

          <div className="favorites-list results-grid">
            {favorites.map((book) => (
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

                {/* Editable title for admin, otherwise just display */}
                {isAdmin ? (
                  <input
                    type="text"
                    value={book.title}
                    onChange={(e) =>
                      dispatch(
                        saveReview({
                          ...book,
                          title: e.target.value,
                        })
                      )
                    }
                  />
                ) : (
                  <h3>{book.title}</h3>
                )}

                {/* Book ID */}
                <p className="book-id">
                  <small>ID: {book.key.split("/").pop()}</small>
                </p>

                {/* Author name */}
                <p>
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

                {/* Book description, editable for admin */}
                {expandedDescriptions[book.key] && (
                  <div className="book-description-wrapper open">
                    {isAdmin ? (
                      <textarea
                        value={book.description ?? ""}
                        onChange={(e) =>
                          dispatch(
                            saveReview({
                              ...book,
                              description: e.target.value,
                            })
                          )
                        }
                      />
                    ) : (
                      <p className="book-description">
                        {book.description ?? "No description available."}
                      </p>
                    )}
                  </div>
                )}

                {/* Link to add a review */}
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

                {/* Remove book from favorites */}
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
