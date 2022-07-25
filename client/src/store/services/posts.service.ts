import IPost from "../../models/IPost";
import IComment from "../../models/IComment";
import { api } from "./api";

interface CommentData {
  body: string;
  authorid: number;
  pageid: number;
  answeron: number | null;
}

export const postsApi = api.injectEndpoints({
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
        url: "/comments/" + postId,
      }),
      providesTags: ["Comment"],
    }),
    postComment: builder.mutation<void, CommentData>({
      query: (commentData) => ({
        url: "/comments/create",
        method: "POST",
        body: commentData,
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});
