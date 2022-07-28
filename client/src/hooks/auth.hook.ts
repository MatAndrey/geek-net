import { useCallback } from "react";
import User from "../models/IUser";
import { userSlice } from "../store/reducers/user.slice";
import { useAppDispatch, useAppSelector } from "./redux.hook";

const storageName = "user";

export default function useAuth() {
  const { token, id, role, name, avatar } = useAppSelector((state) => state.userReducer);
  const { setUser } = userSlice.actions;
  const dispatch = useAppDispatch();

  const login = useCallback(
    (user: User, remember: boolean) => {
      dispatch(setUser(user));
      if (remember) localStorage.setItem(storageName, JSON.stringify(user));
    },
    [dispatch, setUser]
  );

  const logout = useCallback(() => {
    dispatch(setUser({ id: "", token: "", name: "", role: "GUEST", avatar: "" }));
    localStorage.removeItem(storageName);
  }, [dispatch, setUser]);

  if (!token) {
    const string = localStorage.getItem(storageName);
    if (string !== null) {
      const user = JSON.parse(string);
      if (user && user.token && user.id) {
        login(user, true);
      }
    }
  }

  return { token, id, role, name, login, logout, avatar };
}
