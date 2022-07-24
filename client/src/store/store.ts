import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { postsAPI } from "./services/posts.service";
import authReducer from "./reducers/auth.slice";
import userReducer from "./reducers/user.slice";
import createPostReducer from "./reducers/createPost.slice";

const rootReducer = combineReducers({
  [postsAPI.reducerPath]: postsAPI.reducer,
  userReducer,
  authReducer,
  createPostReducer,
});

export function setupStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (defaultMiddleware) => defaultMiddleware().concat(postsAPI.middleware),
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
