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

interface UpdateData {
  name: string;
  avatar: string;
  password: string;
  oldPassword: string;
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
    update: builder.mutation<void, UpdateData>({
      query: (updateData: UpdateData) => ({
        url: "/users/update",
        method: "PUT",
        body: updateData,
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
