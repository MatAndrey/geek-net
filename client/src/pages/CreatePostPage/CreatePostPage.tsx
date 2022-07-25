import { FC, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { createPostSlice } from "../../store/reducers/createPost.slice";
import "./CratePostPage.scss";
import { PrimaryButton } from "../../components/Buttons/PrimaryButton";
import { useCreatePostMutation } from "../../store/services/createPost.service";
import { useNavigate } from "react-router-dom";

export const CreatePostPage: FC = () => {
  const { body, title } = useAppSelector((state) => state.createPostReducer);
  const dispatch = useAppDispatch();
  const { setBody, setTitle } = createPostSlice.actions;
  const [createPostMutation] = useCreatePostMutation();
  const [isEnabled, setIsEnabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleBodyChange = (event, editor) => {
    const data = editor.getData();
    dispatch(setBody(data));
  };

  const handleTitleChange = (event) => {
    dispatch(setTitle(event.target.value));
    if (title !== "") {
      setIsEnabled(true);
      setErrorMessage("");
    }
  };

  const handleSubmit = async () => {
    setIsEnabled(false);
    if (title !== "") {
      const response = await createPostMutation({ body, title });
      if (response && response["data"]) {
        navigate("/posts/" + response["data"].id);
      }
    } else {
      setErrorMessage("Введите заголовок");
    }
  };

  return (
    <div className='create_post_page'>
      <div className='post_wrapper'>
        <h2>Заголовок:</h2>
        <input type='text' value={title} onChange={handleTitleChange} required />
        <div className='row'>
          <p>{errorMessage}</p>
        </div>
        <h2>Текст:</h2>
        <CKEditor editor={Editor} data={body} onChange={handleBodyChange} />
        <PrimaryButton onClick={handleSubmit} disabled={!isEnabled}>
          Опубликовать
        </PrimaryButton>
      </div>
    </div>
  );
};
