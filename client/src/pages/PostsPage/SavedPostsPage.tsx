import { useState } from "react";
import { Loader } from "../../components/Loader/Loader";
import { OrderSelect } from "../../components/OrederSelect/OrderSelect";
import { Post } from "../../components/Post/Post";
import { postsApi } from "../../store/services/posts.service";
import "./PostsPage.scss";

export const SavedPostsPage = () => {
  const [order, setOrder] = useState("new");
  const { data: posts } = postsApi.useGetSavedPostsQuery(order);

  if (posts?.length === 0) {
    return <h2>Сохранённых постов нет</h2>;
  }

  const handleChange = (e) => {
    setOrder(e.target.value);
  };

  return (
    <div className='posts_container'>
      <h2>Сохранённые посты</h2>
      <OrderSelect handleChange={handleChange} />
      {posts ? posts.map((post) => <Post post={post} key={post.id} className='overflow_hidden' />) : <Loader />}
    </div>
  );
};
