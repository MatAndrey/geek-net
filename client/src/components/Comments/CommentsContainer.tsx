import { FC, memo, useState } from "react";
import { postsApi } from "../../store/services/posts.service";
import { Loader } from "../Loader/Loader";
import { Comment } from "./Comment";
import "./Comments.scss";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { PrimaryButton } from "../Buttons/PrimaryButton";
import useAuth from "../../hooks/auth.hook";
import { Link } from "react-router-dom";

interface CommentsProps {
  postId: number;
}

export const CommentsContainer: FC<CommentsProps> = memo(({ postId }) => {
  const { data: comments, isFetching } = postsApi.useGetCommentsByPostIdQuery(+postId);
  const [postCommentMutation] = postsApi.usePostCommentMutation();
  const { token } = useAuth();
  const isAuth = !!token;

  const [comment, setComment] = useState("");

  const handleChange = (event, editor) => {
    const data = editor.getData();
    setComment(data);
  };

  const handleSubmit = () => {
    if (comment !== "") {
      postCommentMutation({
        body: comment,
        pageid: postId,
        answeron: null,
      });
      setComment("");
    }
  };

  return (
    <div className='comments_container'>
      {isAuth ? (
        <>
          <h4>Напишите свой комментарий:</h4>
          <CKEditor editor={Editor} data={comment} onChange={handleChange} />
          <div className='button_wrapper'>
            <PrimaryButton onClick={handleSubmit}>Отправить</PrimaryButton>
          </div>
        </>
      ) : (
        <h4>
          <Link to='/login'>Войдите</Link>, чтобы оставлять комментарии
        </h4>
      )}

      {isFetching ? (
        <Loader />
      ) : !comments?.length ? (
        <h3>Комментариев нет</h3>
      ) : (
        comments.map((comment) => <Comment comment={comment} key={comment.id} isAuth={isAuth} pageid={postId} numberInThrad={0} />)
      )}
    </div>
  );
});
