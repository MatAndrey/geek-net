import User from "../../models/IUser";
import { api } from "./api";

interface LoginData {
  name: string;
  password: string;
  remember: boolean;
  avatar?: string;
}

interface UserInfo {
  name: string;
  avatar: string;
  registratedat: string;
}

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<User, LoginData>({
      query: (loginData: LoginData) => ({
        url: "/auth/signup",
        method: "POST",
        body: loginData,
      }),
    }),
    login: builder.mutation<User, LoginData>({
      query: (loginData: LoginData) => ({
        url: "/auth/login",
        method: "POST",
        body: loginData,
      }),
    }),
    getUserById: builder.query<UserInfo, number>({
      query: (userId) => ({
        url: "/users/" + userId,
      }),
    }),
  }),
});

export const { useSignUpMutation, useLoginMutation } = userApi;
