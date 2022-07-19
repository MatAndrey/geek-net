import { ReactElement } from "react";
import { Route } from "react-router-dom";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage";
import { PostPage } from "../pages/PostPage/PostPage";
import { PostsPage } from "../pages/PostsPage/PostsPage";

interface routeObject {
  path: string;
  element: ReactElement;
}

const defaultRoutes: routeObject[] = [
  { path: "/", element: <PostsPage /> },
  { path: "/posts", element: <PostsPage /> },
  { path: "/posts/:postId", element: <PostPage /> },
  { path: "*", element: <NotFoundPage /> },
];

export default function useRoutes(routes: routeObject[] = defaultRoutes): JSX.Element[] {
  return routes.map((route, index) => <Route path={route.path} element={route.element} key={index} />);
}
