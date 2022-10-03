import { api } from "./api";
import { ICreatePost } from "../reducers/createPost.slice";
import Post from "../../models/IPost";

export const createPostApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation<Post, ICreatePost>({
      query: (post: ICreatePost) => ({
        url: "/posts/create",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["Post"],
    }),
    editPost: builder.mutation<void, Post>({
      query: (post: Post) => ({
        url: "/posts/update",
        method: "PUT",
        body: {
          body: post.body,
          id: post.id,
          authorid: post.authorid,
        },
      }),
      invalidatesTags: ["Post"],
    }),
    deletePost: builder.mutation<void, number>({
      query: (id) => ({
        url: "/posts/delete",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const { useCreatePostMutation, useDeletePostMutation, useEditPostMutation } = createPostApi;
