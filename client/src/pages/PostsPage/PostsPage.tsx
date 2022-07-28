import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { Post } from "../../components/Post/Post";
import { postsApi } from "../../store/services/posts.service";
import "./PostsPage.scss";

export const PostsPage = () => {
  const { data: posts } = postsApi.useGetAllPostsQuery("");
  if (posts?.length === 0) {
    return (
      <h2>
        Постов нет. <Link to='/create-post'>Напишите</Link> первый!
      </h2>
    );
  }
  return (
    <div className='posts_container'>{posts ? posts.map((post) => <Post post={post} key={post.id} className='overflow_hidden' />) : <Loader />}</div>
  );
};
