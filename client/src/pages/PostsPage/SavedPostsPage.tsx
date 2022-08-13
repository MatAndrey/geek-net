import { PostList } from "../../components/PostList/PostList";
import { postsApi } from "../../store/services/posts.service";
import "./PostsPage.scss";

export const SavedPostsPage = () => {
  return <PostList postApi={postsApi.useGetSavedPostsQuery} />;
};
