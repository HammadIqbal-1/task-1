import { createAsyncThunk } from "@reduxjs/toolkit";

// get allposts

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

// get a single dynmaic post

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
