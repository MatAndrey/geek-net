import { api } from "./api";

export const ratingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    postLike: builder.mutation<void, number>({
      query: (postid) => ({
        url: "/rating/posts",
        method: "POST",
        body: { type: "LIKE", postid },
      }),
      invalidatesTags: ["Post"],
    }),
    postDislike: builder.mutation<void, number>({
      query: (postid) => ({
        url: "/rating/posts",
        method: "POST",
        body: { type: "DISLIKE", postid },
      }),
      invalidatesTags: ["Post"],
    }),
    commentLike: builder.mutation<void, number>({
      query: (commentid) => ({
        url: "/rating/comments",
        method: "POST",
        body: { type: "LIKE", commentid },
      }),
      invalidatesTags: ["Comment"],
    }),
    commentDislike: builder.mutation<void, number>({
      query: (commentid) => ({
        url: "/rating/comments",
        method: "POST",
        body: { type: "DISLIKE", commentid },
      }),
      invalidatesTags: ["Comment"],
    }),
    savePost: builder.mutation<void, number>({
      query: (postid) => ({
        url: "/rating/save-post",
        method: "POST",
        body: { postid },
      }),
      invalidatesTags: ["SavedPost"],
    }),
  }),
});
