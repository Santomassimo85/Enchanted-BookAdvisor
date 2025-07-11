import { configureStore } from '@reduxjs/toolkit';
import libraryReducer from './LibrarySlice';

/**
 * Redux store configuration for the Book Advisor application.
 * 
 * This store uses Redux Toolkit's `configureStore` to set up the state management.
 * The `library` slice is managed by `libraryReducer`.
 */
export const store = configureStore({
  // The root reducer object for the Redux store
  reducer: {
    // The 'library' slice of state is handled by libraryReducer
    library: libraryReducer
  }
});
