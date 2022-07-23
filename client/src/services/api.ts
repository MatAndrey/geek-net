import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api/",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).userReducer.token;
    if (token) {
      headers.set("authentication", `Bearer ${token}`);
    }
    return headers;
  },
});

export const api = createApi({
  reducerPath: "splitApi",
  baseQuery: baseQuery,
  tagTypes: ["Comment", "Post"],
  endpoints: () => ({}),
});
