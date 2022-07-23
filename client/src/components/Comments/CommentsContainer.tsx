import { FC } from "react";
import { postsAPI } from "../../services/posts.service";
import { Loader } from "../Loader/Loader";
import { Comment } from "./Comment";
import "./Comments.scss";

interface CommentsProps {
  postId: number;
}

export const CommentsContainer: FC<CommentsProps> = ({ postId }) => {
  const { data: comments, isError, isFetching } = postsAPI.useGetCommentsByPostIdQuery(+postId);
  return (
    <div className='comments_container'>
      {isFetching ? (
        <Loader />
      ) : isError ? (
        "COMMENTS NOT FOUND" //TODO
      ) : !comments?.length ? (
        <h3>Комментариев нет</h3>
      ) : (
        comments.map((comment) => <Comment comment={comment} key={comment.id} />)
      )}
    </div>
  );
};
