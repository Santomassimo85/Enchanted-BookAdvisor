import { configureStore } from '@reduxjs/toolkit';
import libraryReducer from './LibrarySlice'; 

export const store = configureStore({
  reducer: {
    library: libraryReducer
  }
});
