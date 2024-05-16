import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get allposts
export const fetchPostFromApi = createAsyncThunk("fetchPosts", async () => {
  try {
    const res = await axios("https://dummyjson.com/posts");
    const responseData = res.data;
    return responseData;
  } catch (error) {
    console.error("this is a stupid error cuz you are stupid:", error);
    throw error;
  }
});

// get a single dynmaic post
export const fetchSinglePostDynamically = createAsyncThunk(
  "fetchSinglePosts",
  async (id) => {
    try {
      const response = await axios(`https://dummyjson.com/posts/${id}`);
      const respinseDataForDynmaic = response.data;
      return respinseDataForDynmaic;
    } catch (error) {
      console.log("Failed to fetch post:", error);
      throw error;
    }
  }
);
