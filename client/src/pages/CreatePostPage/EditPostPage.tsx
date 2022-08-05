import { FC, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import "./CratePostPage.scss";
import { useDeletePostMutation, useEditPostMutation } from "../../store/services/createPost.service";
import { useLocation, useNavigate } from "react-router-dom";
import Post from "../../models/IPost";
import { RedButton } from "../../components/Buttons/RedButton";
import { SecondaryButton } from "../../components/Buttons/SecondaryButton";

export const EditPostPage: FC = () => {
  const [state, setState] = useState(useLocation().state as Post);
  const [editPostMutation] = useEditPostMutation();
  const [deletePostMutation] = useDeletePostMutation();
  const [isEnabled, setIsEnabled] = useState(true);

  const navigate = useNavigate();

  if (!state?.id) {
    navigate("/");
  }

  const handleBodyChange = (event, editor) => {
    const data = editor.getData();
    setState({ ...state, body: data });
  };

  const handleEdit = async () => {
    setIsEnabled(false);
    if (state.title !== "") {
      const response = await editPostMutation(state);
      if (response && response["data"]) {
        navigate("/posts/" + state.id);
      }
    }
  };

  const handleDelete = async () => {
    const response = await deletePostMutation(state.id);
    if (response && response["data"]) {
      navigate("/");
    }
  };

  return (
    <div className='create_post_page'>
      <div className='post_wrapper'>
        <h2>Заголовок:</h2>
        <h1>{state.title}</h1>
        <h2>Текст:</h2>
        <CKEditor editor={Editor} data={state.body} onChange={handleBodyChange} />
        <div className='button_wrapper'>
          <SecondaryButton onClick={handleEdit} disabled={!isEnabled}>
            Сохранить
          </SecondaryButton>
        </div>
        <div className='button_wrapper'>
          <RedButton onClick={handleDelete}>Удалить</RedButton>
        </div>
      </div>
    </div>
  );
};
