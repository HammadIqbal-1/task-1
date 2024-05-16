import { createSlice } from "@reduxjs/toolkit";
import { fetchPostFromApi, fetchSinglePostDynamically } from "../api/actions";

const initialState = {
  postData: [],
  dynamicData: [],
  wishList: [],
  isLoading: false,
  isError: false,
};
//  put slice
export const apiDataSlice = createSlice({
  name: "apiData",
  initialState,
  reducers: {
    addToWishList(state, action) {
      state.wishList.push(action.payload);
    },
    removeFromWishList(state, action) {
      state.wishList = state.wishList.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostFromApi.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchPostFromApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postData = action.payload;
        state.isError = false;
      })
      .addCase(fetchPostFromApi.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
    builder
      .addCase(fetchSinglePostDynamically.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchSinglePostDynamically.fulfilled, (state, action) => {
        state.dynamicData = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchSinglePostDynamically.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

// fucntions that will be used
export const { addToWishList, removeFromWishList } = apiDataSlice.actions;
// Exporting slices
export default apiDataSlice.reducer;
