import { FC } from "react";
import { convertDatestringToDate } from "../../helpers/convertDate";
import IPost from "../../models/IPost";
import { FiArrowDown, FiArrowUp, FiBookmark, FiMessageSquare } from "react-icons/fi";
import "./Post.scss";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

interface PostProps {
  post: IPost;
  isLink: boolean;
  className?: string;
}

export const Post: FC<PostProps> = ({ post, isLink, className = "" }) => {
  return (
    <article className={"post_component " + className}>
      <div className='post_header'>
        <Link to={`/user/${post.authorid}`} className='user'>
          <img src={post.avatar} alt='avatar' className='avatar' />
          <span className='nickname'>{post.author}</span>
          <span className='date'>{convertDatestringToDate(post.createdat)}</span>
        </Link>
      </div>
      <div className='post_body'>
        {isLink ? (
          <Link to={`/posts/${post.id}`} className='post_link'>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </Link>
        ) : (
          <div className='post_wrapper'>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        )}
      </div>
      <div className='post_footer'>
        <div className='likes'>
          <button className='rating_button icon'>
            <FiArrowUp size='24px' color='rgba(0, 100, 0, 0.7)' />
            {/* TODO рейтинг */}
          </button>
          <div className='likes_count icon'>{post.likes}</div>
          <button className='rating_button icon'>
            <FiArrowDown size='24px' color='rgba(100, 0, 0, 0.7)' />
            {/* TODO рейтинг */}
          </button>
        </div>
        {isLink ? (
          <HashLink to={`/posts/${post.id}#comments`} className={"comments icon"}>
            <FiMessageSquare size='22px' color='rgba(0, 0, 0, 0.7)' />
            {post.comments} Комментариев{/* TODO склонение */}
          </HashLink>
        ) : (
          <>
            <FiMessageSquare size='22px' color='rgba(0, 0, 0, 0.7)' />
            {post.comments} Комментариев {/* TODO склонение */}
          </>
        )}

        <button className='save_button icon'>
          <FiBookmark size='22px' color='rgba(0, 0, 0, 0.7)' /> Сохранить {/* TODO сохранение */}
        </button>
      </div>
    </article>
  );
};
