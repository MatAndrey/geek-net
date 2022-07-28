import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth.slice";
import userReducer from "./reducers/user.slice";
import createPostReducer from "./reducers/createPost.slice";
import { api } from "./services/api";

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  userReducer,
  authReducer,
  createPostReducer,
});

export function setupStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (defaultMiddleware) => defaultMiddleware().concat(api.middleware),
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
