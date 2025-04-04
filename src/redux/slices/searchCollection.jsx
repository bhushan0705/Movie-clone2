import { createSlice } from "@reduxjs/toolkit";

export const searchCollection = createSlice({
  name: searchCollection,
  initialState: {
    searchData: [],
  },
  reducers: {
    setSearchData: (state, action) => {
      state.searchData = action.payload;
    },
  },
});

export const { setSearchData } = searchCollection.actions;

export default searchCollection.reducer;
