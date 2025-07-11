import { useSelector, useDispatch } from "react-redux";
import { removeFromFavorites } from "./LibrarySlice";
import { toast } from "react-toastify";
import "./components/styles/library.css";
import './components/styles/transition.css';

function Library() {
  const favorites = useSelector((state) => state.library.favorites);
  const dispatch = useDispatch();

  const handleRemove = (key) => {
    const book = favorites.find((b) => b.key === key);
    dispatch(removeFromFavorites(key));
    toast.error(`❌ Removed "${book?.title}" from Favorites`);
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
