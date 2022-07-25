import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { postsApi } from "./services/posts.service";
import authReducer from "./reducers/auth.slice";
import userReducer from "./reducers/user.slice";
import createPostReducer from "./reducers/createPost.slice";

const rootReducer = combineReducers({
  [postsApi.reducerPath]: postsApi.reducer,
  userReducer,
  authReducer,
  createPostReducer,
});

export function setupStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (defaultMiddleware) => defaultMiddleware().concat(postsApi.middleware),
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
