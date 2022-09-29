import { FC, useEffect, useState } from "react";
import { Loader } from "../../components/Loader/Loader";
import { OrderSelect } from "../OrederSelect/OrderSelect";
import { Post } from "../../components/Post/Post";
import IPost from "../../models/IPost";
import "./PostList.scss";

interface Props {
  postApi: Function;
  search?: string;
  userid?: number;
}

export const PostList: FC<Props> = ({ postApi, search, userid }) => {
  const [order, setOrder] = useState("createdat");
  const initialPosts: IPost[] = [];
  const [posts, setPosts] = useState(initialPosts);

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  const { data } = postApi({ order, page: currentPage, search, userid });
  useEffect(() => {
    if (data && data.length !== 0) {
      currentPage === 1 ? setPosts(data) : setPosts([...posts, ...data]);
      setIsLoading(false);
    } else {
      setIsEnd(true);
      setIsLoading(false);
    }
    // eslint-disable-next-line
  }, [data]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
    // eslint-disable-next-line
  }, []);
  const scrollHandler = (e) => {
    if (e.target.documentElement.scrollHeight - e.target.documentElement.scrollTop - window.innerHeight < 100 && !isLoading && !isEnd) {
      setIsLoading(true);
      setCurrentPage(currentPage + 1);
    }
  };

  const handleChange = (e) => {
    setOrder(e.target.value);
    setCurrentPage(1);
  };

  if (posts?.length === 0 && !isEnd) {
    return isLoading ? <Loader /> : <h2>Постов нет.</h2>;
  }

  return (
    <div className='posts_container'>
      <OrderSelect handleChange={handleChange} />
      {posts.length ? posts.map((post) => <Post post={post} key={post.id} className='overflow_hidden' />) : <Loader />}
    </div>
  );
};
