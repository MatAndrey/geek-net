import { Loader } from "../../components/Loader/Loader";
import { Post } from "../../components/Post/Post";
import { postsAPI } from "../../services/postsService";

export const PostsPage = () => {
  const { data: posts } = postsAPI.useGetAllPostsQuery("");
  return (
    <div className='posts_container'>
      {posts ? posts.map((post) => <Post post={post} key={post.id} isLink={true} className='overflow_hidden' />) : <Loader />}
    </div>
  );
};
