import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { roles } from "../../models/IUser";

interface UserState {
  token: string;
  name: string;
  role: roles;
  id: string;
  avatar: string;
}

const initialState: UserState = {
  token: "",
  name: "",
  id: "",
  role: "GUEST",
  avatar: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<UserState>) {
      state.id = payload.id;
      state.token = payload.token;
      state.name = payload.name;
      state.role = payload.role;
      state.avatar = payload.avatar;
    },
  },
});

export default userSlice.reducer;
