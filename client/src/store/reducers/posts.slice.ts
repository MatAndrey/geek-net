import { createSlice } from "@reduxjs/toolkit";
import IPost from "../../models/IPost";

interface PostState {
  posts: IPost[];
  isLoading: boolean;
  error: string;
}

const initialState: PostState = {
  posts: [],
  isLoading: false,
  error: "",
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
});

export default postsSlice.reducer;
