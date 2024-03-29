import { FC } from "react";
import { convertDatestringToDate } from "../../helpers/convertDate";
import IPost from "../../models/IPost";
import { FiArrowDown, FiArrowUp, FiBookmark, FiExternalLink, FiMessageSquare } from "react-icons/fi";
import "./Post.scss";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import parse from "html-react-parser";
import { ratingApi } from "../../store/services/rating.service";
import useAuth from "../../hooks/auth.hook";
import useNotification from "../../hooks/notifications.hook";

interface PostProps {
  post: IPost;
  className?: string;
}

export const Post: FC<PostProps> = ({ post, className = "" }) => {
  const reactBody = parse(post.body);
  const [dislikeMutation] = ratingApi.usePostDislikeMutation();
  const [likeMutation] = ratingApi.usePostLikeMutation();
  const [savePost] = ratingApi.useSavePostMutation();
  const { token } = useAuth();
  const { error, info } = useNotification();

  const handleLike = () => {
    if (!token) {
      error("Войдите, чтобы ставить лайки");
    } else {
      likeMutation(post.id);
    }
  };

  const handleDislike = () => {
    if (!token) {
      error("Войдите, чтобы ставить дизлайки");
    } else {
      dislikeMutation(post.id);
    }
  };

  const handleSave = () => {
    if (!token) {
      error("Войдите, чтобы сохранять посты");
    } else {
      savePost(post.id);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.origin + "/posts/" + post.id).then(() => {
      info("Ссылка скопирована в буфер обмена");
    });
  };

  return (
    <article className={"post_component " + className}>
      <div className='post_header'>
        <Link to={`/user/${post.authorid}`} className='user' data-tooltip={post.name}>
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
          <div className='text'>{reactBody}</div>
        </div>
      </div>
      <div className='post_footer'>
        <div className='likes'>
          <button className='rating_button icon' onClick={handleLike} data-tooltip='Лайк'>
            <FiArrowUp size='24px' stroke='rgba(0, 100, 0, 0.5)' />
          </button>
          <div className='likes_count icon'>{post.likes}</div>
          <button className='rating_button icon' onClick={handleDislike} data-tooltip='Дизлайк'>
            <FiArrowDown size='24px' stroke='rgba(100, 0, 0, 0.5)' />
          </button>
        </div>
        <HashLink to={`/posts/${post.id}#comments`} className='comments icon' data-tooltip='Комментарии'>
          <FiMessageSquare size='22px' />
          {post.comments}
        </HashLink>

        <button className='icon' onClick={handleSave} data-tooltip='Сохранить'>
          <FiBookmark size='22px' />
        </button>

        <button className='icon' data-tooltip='Поделиться' onClick={copyLink}>
          <FiExternalLink size='22px' />
        </button>
      </div>
    </article>
  );
};
