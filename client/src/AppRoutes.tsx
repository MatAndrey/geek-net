import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { roles } from "./models/IUser";
import { ChatPage } from "./pages/ChatPage/ChatPage";
import { CreatePostPage } from "./pages/CreatePostPage/CreatePostPage";
import { EditPostPage } from "./pages/CreatePostPage/EditPostPage";
import { LoginPage } from "./pages/LoginPages/LoginPage";
import { SignUpPage } from "./pages/LoginPages/SignUpPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { PostPage } from "./pages/PostPage/PostPage";
import { PostsPage } from "./pages/PostsPage/PostsPage";
import { SavedPostsPage } from "./pages/PostsPage/SavedPostsPage";
import { SearchResultsPage } from "./pages/SearchResultsPage/SearchResults";
import { UserPage } from "./pages/UserPage/UserPage";
import { UserSettingsPage } from "./pages/UserSettingsPage/UserSettingspage";

interface PrpoType {
  isAuth: boolean;
  role: roles;
}

export const AppRoutes: FC<PrpoType> = ({ isAuth, role }) => {
  return (
    <Routes>
      <Route path='/' element={<PostsPage />} />
      <Route path='/posts' element={<PostsPage />} />
      <Route path='/search-results' element={<SearchResultsPage />} />
      <Route path='/posts/:postId' element={<PostPage />} />
      <Route path='/user/:userId' element={<UserPage />} />
      <Route path='/edit-post' element={<EditPostPage />} />
      <Route path='/saved-posts' element={isAuth ? <SavedPostsPage /> : <Navigate to='/login' />} />
      <Route path='/create-post' element={isAuth ? <CreatePostPage /> : <Navigate to='/login' />} />
      <Route path='/user/settings' element={isAuth ? <UserSettingsPage /> : <Navigate to='/login' />} />
      {/* <Route path='/chat' element={isAuth ? <ChatPage /> : <Navigate to='/login' />} /> */}
      <Route path='/chat' element={<ChatPage />} />
      <Route path='/login' element={isAuth ? <Navigate to='/' /> : <LoginPage />} />
      <Route path='/signup' element={isAuth ? <Navigate to='/' /> : <SignUpPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};
