// dynamicSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSinglePostDynamically = createAsyncThunk(
  "fetchSinglePosts",
  async (id) => {
    try {
      const response = await fetch(`https://dummyjson.com/posts/${id}`);
      return response.json();
    } catch (error) {
      console.log("Failed to fetch post:", error);
      throw error;
    }
  }
);

const dynamicSlice = createSlice({
  name: "dynmaicDataFormSinglePost",
  initialState: {
    dynamicData: [],
    isLoading: false,
    isError: false,
  },

  extraReducers: (builder) => {
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


export default dynamicSlice.reducer;
