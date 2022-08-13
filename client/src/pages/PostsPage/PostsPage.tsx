import { PostList } from "../../components/PostList/PostList";
import { postsApi } from "../../store/services/posts.service";
import "./PostsPage.scss";

export const PostsPage = () => {
  const api = postsApi.useGetAllPostsQuery;
  return <PostList postApi={api} />;
};
