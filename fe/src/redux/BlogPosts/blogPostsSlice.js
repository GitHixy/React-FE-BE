import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosClient from "../../Client/client";
const client = new AxiosClient();

const initialState = {
  posts: [],
  isLoading: false,
  error: null,
  totalPosts: 0,
};

export const getAllPosts = createAsyncThunk("posts/GETPOSTS", async () => {
  return await client.get("/post");
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalPosts = action.payload.length;
        state.posts = action.payload;
      })
      .addCase(getAllPosts.rejected, (state) => {
        state.isLoading = false;
        state.error = "Oops, an error had occurred";
      });
  }
});

export const allPosts = (state) => state.postsData.posts

export default postsSlice.reducer
