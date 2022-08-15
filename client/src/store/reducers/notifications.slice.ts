import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import INotification from "../../models/INotification";

const initialState: INotification[] = [];

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<INotification>) => {
      state.push(action.payload);
    },
    removeNotification: (state, action: PayloadAction<number>) => {
      return state.filter((not) => not.id !== action.payload);
    },
  },
});

export default notificationsSlice.reducer;
export const { addNotification, removeNotification } = notificationsSlice.actions;
