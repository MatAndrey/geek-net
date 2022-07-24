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
  }),
});

export const { useCreatePostMutation } = createPostApi;
