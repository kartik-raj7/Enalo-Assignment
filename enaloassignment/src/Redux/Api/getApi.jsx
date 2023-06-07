import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseurl } from './base';
import { useSelector } from 'react-redux';

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (type) => {
    try {
      const response = await fetch(`${baseurl}/${type}`);
      const data = await response.json();
      return { data, status: response.status };
    } catch (error) {
      const status = error.response ? error.response.status : 401;
      const message = error.response ? await error.response.json() : "Unauthorized";
      return { status, message };
    }
  }
);

const getSlice = createSlice({
  name: "getposts",
  initialState: {
    getposts: [],
    loading: false,
    statuscode: null,
    error: null,
  },
  reducers: {
    clearPosts: (state) => {
      state.getposts = [];
    },
  },
  extraReducers: {
    [getPosts.pending]: (state, action) => {
      state.loading = true;
    },
    [getPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.getposts = action.payload.data;
      state.statuscode = action.payload.status;
    },
    [getPosts.rejected]: (state, action) => {
      state.loading = false;
      state.statuscode = action.payload.status;
      state.error = action.payload.message;
    },
  },
});
export const GetPostsData = state => state.getPosts;
export default getSlice.reducer;
export const { clearPosts } = getSlice.actions;
