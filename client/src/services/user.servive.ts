import User from "../models/IUser";
import { api } from "./api";

interface LoginData {
  name: string;
  password: string;
  remember: boolean;
}

export const userAPI = api.injectEndpoints({
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
  }),
});

export const { useSignUpMutation, useLoginMutation } = userAPI;
