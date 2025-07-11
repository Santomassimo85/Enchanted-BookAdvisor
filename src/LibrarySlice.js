// LibrarySlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
  cart: [],
  reviews: {}, // { [bookId]: { rating, comment, cover_i, title } }
};

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const exists = state.favorites.find((b) => b.key === action.payload.key);
      if (!exists) state.favorites.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      const index = state.favorites.findIndex((b) => b.key === action.payload);
      if (index !== -1) state.favorites.splice(index, 1);
    },
    addToCart: (state, action) => {
      const exists = state.cart.find((b) => b.key === action.payload.key);
      if (!exists) state.cart.push(action.payload);
    },
    clearCart: (state) => {
      state.cart = [];
    },

    removeFromCart: (state, action) => {
      const index = state.cart.findIndex((b) => b.key === action.payload);
      if (index !== -1) state.cart.splice(index, 1);
    },
    saveReview: (state, action) => {
      const { bookId, rating, comment, cover_i, title } = action.payload; // Destruttura anche cover_i e title
      state.reviews[bookId] = { rating, comment, cover_i, title }; // Salva cover_i e title
    },
  },
});

export const {
  addToFavorites,
  removeFromFavorites,
  addToCart,
  clearCart,
  removeFromCart,
  saveReview,
} = librarySlice.actions;

export default librarySlice.reducer;