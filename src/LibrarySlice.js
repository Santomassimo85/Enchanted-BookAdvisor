// LibrarySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/**
 * Async thunk to simulate sending site feedback.
 * @param {Object} payload - The feedback payload.
 * @param {number} payload.rating - The rating value.
 * @param {string} payload.comment - The feedback comment.
 * @returns {Promise<Object>} Resolves with feedback data if rating > 0, otherwise rejects.
 */
export const submitSiteFeedback = createAsyncThunk(
  "library/submitSiteFeedback",
  async ({ rating, comment }) => {
    // Simulate API delay: 1 second
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (rating > 0) {
          resolve({ rating, comment });
        } else {
          reject(new Error("Invalid rating"));
        }
      }, 1000);
    });
  }
);

/**
 * @typedef {Object} LibraryState
 * @property {Array<Object>} favorites - List of favorite books.
 * @property {Array<Object>} cart - List of books in the cart.
 * @property {Object} reviews - Reviews keyed by bookId.
 * @property {boolean} isAdmin - Admin status.
 * @property {string} feedbackStatus - Status of feedback submission.
 * @property {string|null} feedbackError - Error message for feedback submission.
 */

/** @type {LibraryState} */
const initialState = {
  favorites: [],
  cart: [],
  reviews: {},
  isAdmin: false,
  feedbackStatus: "idle", // idle | loading | succeeded | failed
  feedbackError: null,
};

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    /**
     * Add a book to favorites if not already present.
     * @param {LibraryState} state
     * @param {Object} action
     */
    addToFavorites: (state, action) => {
      const exists = state.favorites.find((b) => b.key === action.payload.key);
      if (!exists) state.favorites.push(action.payload);
    },
    /**
     * Remove a book from favorites by key.
     * @param {LibraryState} state
     * @param {Object} action
     */
    removeFromFavorites: (state, action) => {
      const index = state.favorites.findIndex((b) => b.key === action.payload);
      if (index !== -1) state.favorites.splice(index, 1);
    },
    /**
     * Add a book to the cart if not already present.
     * @param {LibraryState} state
     * @param {Object} action
     */
    addToCart: (state, action) => {
      const exists = state.cart.find((b) => b.key === action.payload.key);
      if (!exists) state.cart.push(action.payload);
    },
    /**
     * Clear all books from the cart.
     * @param {LibraryState} state
     */
    clearCart: (state) => {
      state.cart = [];
    },
    /**
     * Remove a book from the cart by key.
     * @param {LibraryState} state
     * @param {Object} action
     */
    removeFromCart: (state, action) => {
      const index = state.cart.findIndex((b) => b.key === action.payload);
      if (index !== -1) state.cart.splice(index, 1);
    },
    /**
     * Save a review for a book.
     * @param {LibraryState} state
     * @param {Object} action
     */
    saveReview: (state, action) => {
      const { bookId, rating, comment, cover_i, title, description } = action.payload;
      state.reviews[bookId] = { rating, comment, cover_i, title, description };
    },
    /**
     * Remove a review by bookId.
     * @param {LibraryState} state
     * @param {Object} action
     */
    removeReview: (state, action) => {
      delete state.reviews[action.payload];
    },
    /**
     * Clear all reviews.
     * @param {LibraryState} state
     */
    clearReviews: (state) => {
      state.reviews = {};
    },
    /**
     * Set admin status.
     * @param {LibraryState} state
     * @param {Object} action
     */
    setAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitSiteFeedback.pending, (state) => {
        state.feedbackStatus = "loading";
        state.feedbackError = null;
      })
      .addCase(submitSiteFeedback.fulfilled, (state) => {
        state.feedbackStatus = "succeeded";
        // You could also save the received feedback if needed
      })
      .addCase(submitSiteFeedback.rejected, (state, action) => {
        state.feedbackStatus = "failed";
        state.feedbackError = action.error.message;
      });
  },
});

export const {
  addToFavorites,
  removeFromFavorites,
  addToCart,
  clearCart,
  removeFromCart,
  saveReview,
  removeReview,
  clearReviews,
  setAdmin,
} = librarySlice.actions;

export default librarySlice.reducer;
