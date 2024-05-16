import { createSlice } from "@reduxjs/toolkit";
import { fetchPostFromApi } from "../api/actions";

export const actionSlice = createSlice({
  name: "apiData",
  initialState: {
    postData: [],
    isLoading: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPostFromApi.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchPostFromApi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.postData = action.payload;
      state.isError = false;
    });

    builder.addCase(fetchPostFromApi.rejected, (state, action) => {
      state.isError = true;
      console.log("error", action.payload);
    });
  },
});

export default actionSlice.reducer;
