import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import profileReducer from '../features/profileSlice'; // import profile reducer

export const store = configureStore({
  reducer: {
    user: userReducer,       // user slice
    profile: profileReducer, // profile slice
  },
});
