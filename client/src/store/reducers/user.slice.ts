import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { roles } from "../../models/IUser";

interface UserState {
  token: string;
  name: string;
  role: roles;
  id: string;
}

const initialState: UserState = {
  token: "",
  name: "",
  id: "",
  role: "GUEST",
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
    },
  },
});

export default userSlice.reducer;
