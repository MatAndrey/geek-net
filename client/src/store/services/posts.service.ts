import IPost from "../../models/IPost";
import IComment from "../../models/IComment";
import { api } from "./api";

interface CommentData {
  body: string;
  pageid: number;
  answeron: number | null;
}

interface PostsQuery {
  order: string;
  page: number;
  userid?: number;
  search?: string;
}

export const postsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query<IPost[], PostsQuery>({
      query: ({ order, page }) => ({
        url: "/posts",
        params: { order, page },
      }),
      providesTags: ["Post"],
    }),
    getSavedPosts: builder.query<IPost[], PostsQuery>({
      query: ({ order, page }) => ({
        url: "/posts/saved",
        params: { order, page },
      }),
      providesTags: ["SavedPost"],
    }),
    getPostByUserId: builder.query<IPost[], PostsQuery>({
      query: ({ userid, order, page }) => ({
        url: "/posts/user/" + userid,
        params: { order, page },
      }),
      providesTags: ["Post"],
    }),
    searchPosts: builder.query<IPost[], PostsQuery>({
      query: ({ order, page, search }) => ({
        url: "/posts/search",
        params: { search, order, page },
      }),
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
