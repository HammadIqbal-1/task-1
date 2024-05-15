import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPostFromApi = createAsyncThunk("fetchPosts", async () => {
  try {
    const res = await fetch("https://dummyjson.com/posts");
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error("this is a stupid error cuz you are stupid:", error);
    throw error;
  }
});

const actionSlice = createSlice({
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
