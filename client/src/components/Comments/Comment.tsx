import { FC } from "react";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { Link } from "react-router-dom";
import { convertDatestringToDate } from "../../helpers/convertDate";
import IComment from "../../models/IComment";
import { postsAPI } from "../../services/postsService";

interface CommentProps {
  comment: IComment;
}

export const Comment: FC<CommentProps> = ({ comment }) => {
  // const { data: answers } = postsAPI.useGetAnswersByCommentIdQuery(comment.id);
  // const isAnswers = Array.isArray(answers) && answers.length > 0;
  // console.log(answers);
  return (
    <div className='comment'>
      <div className='comment_header'>
        <Link to={`/user/${comment.authorid}`} className='user'>
          <img src={comment.avatar} alt='avatar' className='avatar' />
          <span className='nickname'>{comment.author}</span>
          <span className='date'>{convertDatestringToDate(comment.createdat)}</span>
        </Link>
      </div>
      <div className='tread_line'>
        <i></i>
      </div>
      {/* TODO CLKICKABLE */}
      <div className='comment_body'>{comment.body}</div>
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
        </div>
        <button>ответить</button>
        {/* TODO ANSWER */}
      </div>
      {/* <div className='child_comment'>{isAnswers && answers.map((answer) => <Comment comment={answer} key={answer.id} />)}</div> */}
      {/* TODO ANSWERS GAP */}
    </div>
  );
};
