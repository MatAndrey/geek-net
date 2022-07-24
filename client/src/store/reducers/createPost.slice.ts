import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICreatePost {
  body: string;
  title: string;
}

const initialState: ICreatePost = {
  body: "",
  title: "",
};

export const createPostSlice = createSlice({
  name: "createPost",
  initialState,
  reducers: {
    setBody(state, action: PayloadAction<string>) {
      state.body = action.payload;
    },
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
  },
});

export default createPostSlice.reducer;
