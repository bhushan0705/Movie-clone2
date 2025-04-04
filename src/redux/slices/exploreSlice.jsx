import { createSlice } from "@reduxjs/toolkit";

export const exploreData = createSlice({
  name: "explore",
  initialState: {
    exploreData: [],
    imageUrl2: "",
  },
  reducers: {
    setExploreData: (state, action) => {
      state.exploreData = action.payload;
    },
    setImageUrl: (state, action) => {
      state.imageUrl2 = action.payload;
    },
  },
});

export const { setExploreData, setImageUrl } = exploreData.actions;

export default exploreData.reducer;
