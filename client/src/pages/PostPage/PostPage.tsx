import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RedButton } from "../../components/Buttons/RedButton";
import { SecondaryButton } from "../../components/Buttons/SecondaryButton";
import { CommentsContainer } from "../../components/Comments/CommentsContainer";
import { Loader } from "../../components/Loader/Loader";
import { Post } from "../../components/Post/Post";
import useAuth from "../../hooks/auth.hook";
import { useDeletePostMutation } from "../../store/services/createPost.service";
import { postsApi } from "../../store/services/posts.service";
import { NotFoundPage } from "../NotFoundPage/NotFoundPage";
import "./PostPage.scss";

export const PostPage: FC = () => {
  const { postId } = useParams();
  const { role } = useAuth();
  const navigate = useNavigate();
  const [deletePostMutation] = useDeletePostMutation();
  const { id } = useAuth();

  if (postId) {
    var { data: post, isFetching } = postsApi.useGetPostByIdQuery(+postId);

    const handleEdit = () => {
      if (post) {
        navigate("/edit-post", { state: post });
      }
    };

    const handleDelete = async () => {
      const response = await deletePostMutation(+postId);
      if (response && response["data"]) {
        navigate("/");
      }
    };

    return isFetching ? (
      <Loader />
    ) : post === undefined ? (
      <NotFoundPage />
    ) : (
      <div className='post_page'>
        <Post post={post} />
        {(role === "ADMIN" || post.authorid === +id) && (
          <div className='admin_bar'>
            <div className='button_wrapper'>
              <SecondaryButton onClick={handleEdit}>Редактировать</SecondaryButton>
            </div>
            <div className='button_wrapper'>
              <RedButton onClick={handleDelete}>Удалить</RedButton>
            </div>
          </div>
        )}
        <h2 id='comments'>Комментарии</h2>
        <CommentsContainer postId={+postId} />
      </div>
    );
  }
  return <NotFoundPage />;
};
