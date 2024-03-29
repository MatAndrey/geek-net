import HTMLReactParser from "html-react-parser";
import { FC, memo, useState } from "react";
import { FiArrowDown, FiArrowUp, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { convertDatestringToDate } from "../../helpers/convertDate";
import IComment from "../../models/IComment";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { SecondaryButton } from "../Buttons/SecondaryButton";
import { ThirdlyButton } from "../Buttons/ThirdlyButton";
import { postsApi } from "../../store/services/posts.service";
import { ratingApi } from "../../store/services/rating.service";
import useNotification from "../../hooks/notifications.hook";

interface CommentProps {
  comment: IComment;
  isAuth: boolean;
  pageid: number;
  numberInThrad: number;
}

export const Comment: FC<CommentProps> = memo(({ comment, isAuth, pageid, numberInThrad }) => {
  const body = HTMLReactParser(comment.body);
  const [postCommentMutation] = postsApi.usePostCommentMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [isThread, setIsThread] = useState(true);
  const { error } = useNotification();

  const [likeMutation] = ratingApi.useCommentLikeMutation();
  const [dislikeMutation] = ratingApi.useCommentDislikeMutation();

  const handleChange = (event, editor) => {
    const data = editor.getData();
    setAnswer(data);
  };

  const handleLike = () => {
    if (!isAuth) {
      error("Войдите, чтобы ставить лайки");
    } else {
      likeMutation(comment.id);
    }
  };

  const handleDislike = () => {
    if (!isAuth) {
      error("Войдите, чтобы ставить дизлайки");
    } else {
      dislikeMutation(comment.id);
    }
  };

  const handleOpenAnswer = () => {
    if (!isAuth) {
      error("Войдите, чтобы оставлять комментарии");
    } else {
      setIsOpen(true);
    }
  };

  const handleSubmit = () => {
    if (answer !== "") {
      postCommentMutation({ body: answer, pageid, answeron: comment.id });
      setAnswer("");
    }
  };

  if (isThread) {
    return (
      <div className={"comment"}>
        {numberInThrad > 0 && numberInThrad % 5 !== 0 && (
          <div className='tread_line'>
            <i onClick={() => setIsThread(false)}></i>
          </div>
        )}

        <div className='comment_header'>
          <Link to={`/user/${comment.authorid}`} className='user'>
            <img src={comment.avatar} alt='' className='avatar' />
            <span className='nickname'>{comment.name}</span>
            <span className='date'>{convertDatestringToDate(comment.createdat)}</span>
          </Link>
        </div>

        <div className='comment_body'>{body}</div>
        <div className='comment_footer'>
          <div className='likes'>
            <button className='rating_button icon' onClick={handleLike}>
              <FiArrowUp size='24px' stroke='rgba(0, 100, 0, 0.5)' />
            </button>
            <div className='likes_count icon'>{comment.likes}</div>
            <button className='rating_button icon' onClick={handleDislike}>
              <FiArrowDown size='24px' stroke='rgba(100, 0, 0, 0.5)' />
            </button>
            <button onClick={handleOpenAnswer}>ответить</button>
          </div>
          {isOpen && (
            <div className='answer'>
              <CKEditor editor={Editor} data={answer} onChange={handleChange} />
              <SecondaryButton onClick={handleSubmit}>Отправить</SecondaryButton>
              <ThirdlyButton onClick={() => setIsOpen(false)}>Отменить</ThirdlyButton>
            </div>
          )}
        </div>
        <div className={"child_comment" + ((numberInThrad + 1) % 5 === 0 ? " overflow" : "")}>
          {(numberInThrad + 1) % 5 === 0 && (
            <div className='horizontal_line'>
              <i></i>
            </div>
          )}
          {comment.comments.map((answer) => (
            <Comment comment={answer} key={answer.id} isAuth={isAuth} pageid={pageid} numberInThrad={numberInThrad + 1} />
          ))}
        </div>
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
});
