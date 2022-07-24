import { FC } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { createPostSlice } from "../../store/reducers/createPost.slice";
import "./CratePostPage.scss";
import { PrimaryButton } from "../../components/Buttons/PrimaryButton";
import { useCreatePostMutation } from "../../store/services/createPost.service";

export const CreatePostPage: FC = () => {
  const { body, title } = useAppSelector((state) => state.createPostReducer);
  const dispatch = useAppDispatch();
  const { setBody, setTitle } = createPostSlice.actions;
  const [createPostMutation] = useCreatePostMutation();

  const handleBodyChange = (event, editor) => {
    const data = editor.getData();
    dispatch(setBody(data));
  };

  const handleTitleChange = (event) => {
    dispatch(setTitle(event.target.value));
  };

  const handleSubmit = async () => {
    if (title !== "") {
      const response = await createPostMutation({ body, title });
      console.log(response);
    }
  };

  return (
    <div className='create_post_page'>
      <div className='post_wrapper'>
        <h2>Заголовок:</h2>
        <input type='text' value={title} onChange={handleTitleChange} />
        <h2>Текст:</h2>
        <CKEditor editor={Editor} data={body} onChange={handleBodyChange} />
        <PrimaryButton onClick={handleSubmit}>Опубликовать</PrimaryButton>
      </div>
    </div>
  );
};
