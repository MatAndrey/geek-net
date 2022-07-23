import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPages/LoginPage";
import { SignUpPage } from "./pages/LoginPages/SignUpPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { PostPage } from "./pages/PostPage/PostPage";
import { PostsPage } from "./pages/PostsPage/PostsPage";

interface PrpoType {
  isAuth: boolean;
}

export const AppRoutes: FC<PrpoType> = ({ isAuth }) => {
  return (
    <Routes>
      <Route path='/' element={<PostsPage />} />
      <Route path='/posts' element={<PostsPage />} />
      <Route path='/posts/:postId' element={<PostPage />} />
      <Route path='/login' element={isAuth ? <Navigate to='/' /> : <LoginPage />} />
      <Route path='/signup' element={isAuth ? <Navigate to='/' /> : <SignUpPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};
