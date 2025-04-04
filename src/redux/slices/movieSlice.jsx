import { createSlice } from "@reduxjs/toolkit";

export const movieSlice = createSlice({
  name: "movie",
  initialState: {
    bannerData: [],
    nowPlaying: [],
    topRated: [],
    upcoming: [],
    popularTv: [],
    searchData: [],
    movieId: {
      media_type: null,
      id: null,
    },
    imageUrl: "",
  },
  reducers: {
    setBannerdata: (state, action) => {
      state.bannerData = action.payload;
    },
    setImageUrl: (state, action) => {
      state.imageUrl = action.payload;
    },
    setNowPlaying: (state, action) => {
      state.nowPlaying = action.payload;
    },
    setTopRated: (state, action) => {
      state.topRated = action.payload;
    },
    setUpcoming: (state, action) => {
      state.upcoming = action.payload;
    },
    setTv: (state, action) => {
      state.popularTv = action.payload;
    },
    setSearchData: (state, action) => {
      state.searchData = action.payload;
    },
    setMovieId: (state, action) => {
      state.movieId = action.payload;
    },
  },
});

export const {
  setBannerdata,
  setImageUrl,
  setNowPlaying,
  setTopRated,
  setUpcoming,
  setTv,
  setSearchData,
  setMovieId,
} = movieSlice.actions;

export default movieSlice.reducer;
