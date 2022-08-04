import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { OrderSelect } from "../../components/OrederSelect/OrderSelect";
import { Post } from "../../components/Post/Post";
import { postsApi } from "../../store/services/posts.service";
import "./PostsPage.scss";

export const PostsPage = () => {
  const [order, setOrder] = useState("new");
  const { data: posts } = postsApi.useGetAllPostsQuery(order);

  if (posts?.length === 0) {
    return (
      <h2>
        Постов нет. <Link to='/create-post'>Напишите</Link> первый!
      </h2>
    );
  }

  const handleChange = (e) => {
    setOrder(e.target.value);
  };

  return (
    <div className='posts_container'>
      <OrderSelect handleChange={handleChange} />
      {posts ? posts.map((post) => <Post post={post} key={post.id} className='overflow_hidden' />) : <Loader />}
    </div>
  );
};
