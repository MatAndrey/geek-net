import HTMLReactParser from "html-react-parser";
import { FC, useState } from "react";
import { FiArrowDown, FiArrowUp, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { convertDatestringToDate } from "../../helpers/convertDate";
import IComment from "../../models/IComment";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { SecondaryButton } from "../Buttons/SecondaryButton";
import { ThirdlyButton } from "../Buttons/ThirdlyButton";
import { postsApi } from "../../store/services/posts.service";
import useAuth from "../../hooks/auth.hook";

interface CommentProps {
  comment: IComment;
  isAuth: boolean;
  pageid: number;
  numberInThrad: number;
}

export const Comment: FC<CommentProps> = ({ comment, isAuth, pageid, numberInThrad }) => {
  const body = HTMLReactParser(comment.body);
  const [postCommentMutation] = postsApi.usePostCommentMutation();
  const { id: userId } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [isThread, setIsThread] = useState(true);

  const handleChange = (event, editor) => {
    const data = editor.getData();
    setAnswer(data);
  };

  const handleSubmit = () => {
    if (answer !== "") {
      postCommentMutation({ body: answer, pageid, authorid: +userId, answeron: comment.id });
      setAnswer("");
    }
  };

  if (isThread) {
    return (
      <div className='comment'>
        <div className='comment_header'>
          <Link to={`/user/${comment.authorid}`} className='user'>
            <img src={comment.avatar} alt='' className='avatar' />
            <span className='nickname'>{comment.author}</span>
            <span className='date'>{convertDatestringToDate(comment.createdat)}</span>
          </Link>
        </div>
        <div className='tread_line'>
          <i onClick={() => setIsThread(false)}></i>
        </div>

        {/* TODO CLKICKABLE */}
        <div className='comment_body'>{body}</div>
        <div className='comment_footer'>
          <div className='likes'>
            <button className='rating_button icon'>
              <FiArrowUp size='24px' color='rgba(0, 100, 0, 0.7)' />
              {/* TODO рейтинг */}
            </button>
            <div className='likes_count icon'>{comment.likes}</div>
            <button className='rating_button icon'>
              <FiArrowDown size='24px' color='rgba(100, 0, 0, 0.7)' />
              {/* TODO рейтинг */}
            </button>
            {isAuth ? !isOpen && <button onClick={() => setIsOpen(true)}>ответить</button> : <Link to='/login'>ответить</Link>}
          </div>
          {isOpen && (
            <div className='answer'>
              <CKEditor editor={Editor} data={answer} onChange={handleChange} />
              <SecondaryButton onClick={handleSubmit}>Отправить</SecondaryButton>
              <ThirdlyButton onClick={() => setIsOpen(false)}>Отменить</ThirdlyButton>
            </div>
          )}
          {/* TODO ANSWER */}
        </div>
        <div className='child_comment'>
          {comment.comments.map((answer) => (
            <Comment comment={answer} key={answer.id} isAuth={isAuth} pageid={pageid} numberInThrad={numberInThrad + 1} />
          ))}
        </div>
        {/* TODO ANSWERS GAP */}
      </div>
    );
  } else {
    return (
      <div className='no_thread'>
        <button onClick={() => setIsThread(true)}>
          <FiPlus size={22} />
          больше комментариев
        </button>
      </div>
    );
  }
};
