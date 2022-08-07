import { FC } from "react";
import { convertDatestringToDate } from "../../helpers/convertDate";
import IPost from "../../models/IPost";
import { FiArrowDown, FiArrowUp, FiBookmark, FiMessageSquare } from "react-icons/fi";
import "./Post.scss";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import parse from "html-react-parser";
import { ratingApi } from "../../store/services/rating.service";

interface PostProps {
  post: IPost;
  className?: string;
}

export const Post: FC<PostProps> = ({ post, className = "" }) => {
  const reactBody = parse(post.body);
  const [dislikeMutation] = ratingApi.usePostDislikeMutation();
  const [likeMutation] = ratingApi.usePostLikeMutation();

  const handleLike = () => {
    likeMutation(post.id);
  };

  const handleDislike = () => {
    dislikeMutation(post.id);
  };

  return (
    <article className={"post_component " + className}>
      <div className='post_header'>
        <Link to={`/user/${post.authorid}`} className='user'>
          <img src={post.avatar} alt='' className='avatar' />
          <span className='nickname'>{post.name}</span>
          <span className='date'>{convertDatestringToDate(post.createdat)}</span>
        </Link>
      </div>
      <div className='post_body'>
        <div className='post_wrapper'>
          <Link to={`/posts/${post.id}`} className='post_link'>
            <h3>{post.title}</h3>
          </Link>
          {reactBody}
        </div>
      </div>
      <div className='post_footer'>
        <div className='likes'>
          <button className='rating_button icon' onClick={handleLike}>
            <FiArrowUp size='24px' stroke='rgba(0, 100, 0, 0.5)' />
          </button>
          <div className='likes_count icon'>{post.likes}</div>
          <button className='rating_button icon' onClick={handleDislike}>
            <FiArrowDown size='24px' stroke='rgba(100, 0, 0, 0.7)' />
          </button>
        </div>
        <HashLink to={`/posts/${post.id}#comments`} className={"comments icon"}>
          <FiMessageSquare size='22px' />
          {post.comments}
        </HashLink>

        <button className='save_button icon'>
          <FiBookmark size='22px' /> Сохранить {/* TODO сохранение */}
        </button>
      </div>
    </article>
  );
};
