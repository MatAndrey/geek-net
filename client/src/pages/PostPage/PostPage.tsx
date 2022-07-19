import { FC } from "react";
import { useParams } from "react-router-dom";
import { CommentsContainer } from "../../components/Comments/CommentsContainer";
import { Loader } from "../../components/Loader/Loader";
import { Post } from "../../components/Post/Post";
import { postsAPI } from "../../services/postsService";
import { NotFoundPage } from "../NotFoundPage/NotFoundPage";
import "./PostPage.scss";

export const PostPage: FC = () => {
  const { postId } = useParams();

  if (postId) {
    var { data: post, isFetching } = postsAPI.useGetPostByIdQuery(+postId);
    return isFetching ? (
      <Loader />
    ) : post === undefined ? (
      <NotFoundPage />
    ) : (
      <div className='post_page'>
        <Post post={post} isLink={false} />
        <h2 id='comments'>Комментарии</h2>
        <CommentsContainer postId={+postId} />
      </div>
    );
  }
  return <NotFoundPage />;
};
