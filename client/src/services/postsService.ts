import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import IPost from "../models/IPost";
import IComment from "../models/IComment";

export const postsAPI = createApi({
  reducerPath: "postsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Post", "Comment"],
  endpoints: (builder) => ({
    getAllPosts: builder.query<IPost[], string>({
      query: () => ({
        url: "/posts",
      }),
      providesTags: ["Post"],
    }),
    getPostById: builder.query<IPost, number>({
      query: (id) => ({
        url: "/posts/" + id,
      }),
      providesTags: ["Post"],
    }),
    getCommentsByPostId: builder.query<IComment[], number>({
      query: (postId) => ({
        url: "./comments",
        params: {
          postid: postId,
        },
      }),
      providesTags: ["Comment"],
    }),
    getAnswersByCommentId: builder.query<IComment[], number>({
      query: (commentId) => ({
        url: "./comments",
        params: {
          answeron: commentId,
        },
      }),
      providesTags: ["Comment"],
    }),
  }),
});
