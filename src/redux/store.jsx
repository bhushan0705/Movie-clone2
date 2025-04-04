import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./slices/movieSlice";
import exploreReducer from "./slices/exploreSlice";
import authReducer from "./slices/authSlice";



export const store =configureStore({
    reducer:{
      movieData : movieReducer,
      explore: exploreReducer,
      auth: authReducer
    }
});