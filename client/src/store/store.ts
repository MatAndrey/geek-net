import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { postsAPI } from "../services/postsService";
import postsReducer from "./reducers/posts.slice";

const rootReducer = combineReducers({
  postsReducer,
  [postsAPI.reducerPath]: postsAPI.reducer,
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
