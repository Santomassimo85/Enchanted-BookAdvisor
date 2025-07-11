// Profile.jsx
import { useSelector } from "react-redux";
import "./styles/profile.css"; // Ensure you have this CSS file for styling

function Profile() {
  const reviews = useSelector((state) => state.library.reviews);

  const reviewList = Object.entries(reviews); // [[id, {rating, comment, cover_i, title}], ...]

  return (
    <div className="profile-container">
      <h2>My Library Reviews</h2>

      {reviewList.length === 0 ? (
        <p>No reviews yet. Start your adventure!</p>
      ) : (
        <div className="review-list results-grid">
          {reviewList.map(
            (
              [bookId, { rating, comment, cover_i, title }] // Destruttura cover_i e title
            ) => (
              <div key={bookId} className="review-card">
                <div className="review-layout">
                  {cover_i ? (
                    <img
                      src={`https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`}
                      alt={`${title || "Book"} cover`}
                      className="review-cover"
                    />
                  ) : (
                    <div className="no-cover">No cover</div>
                  )}

                  <div className="review-info">
                    <h3>{title || `ID: ${bookId}`}</h3>
                    <p className="review-rating">⭐ {rating} / 5</p>
                    <p className="review-comment">
                      <em>{comment}</em>
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;
