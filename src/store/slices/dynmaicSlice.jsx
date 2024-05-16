import { createSlice } from "@reduxjs/toolkit";
import { fetchSinglePostDynamically } from "../api/actions";

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
  