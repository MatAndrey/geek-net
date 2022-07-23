import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthFormState {
  name: string;
  nameMas: string;
  password: string;
  passMas: string;
  doubPass: string;
  doubPassMas: string;
  remember: boolean;
}

const initialState: AuthFormState = {
  name: "",
  nameMas: "",
  password: "",
  passMas: "",
  doubPass: "",
  doubPassMas: "",
  remember: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setNameMas(state, action: PayloadAction<string>) {
      state.nameMas = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setPassMas(state, action: PayloadAction<string>) {
      state.passMas = action.payload;
    },
    setDoubPass(state, action: PayloadAction<string>) {
      state.doubPass = action.payload;
    },
    setDoubPassMas(state, action: PayloadAction<string>) {
      state.doubPassMas = action.payload;
    },
    setRemember(state, action: PayloadAction<boolean>) {
      state.remember = action.payload;
    },
    resetForm(state) {
      state.name = "";
      state.nameMas = "";
      state.password = "";
      state.passMas = "";
      state.doubPass = "";
      state.doubPassMas = "";
      state.remember = false;
    },
  },
});

export default authSlice.reducer;
