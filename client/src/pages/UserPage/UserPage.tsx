import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RedButton } from "../../components/Buttons/RedButton";
import { Loader } from "../../components/Loader/Loader";
import { Post } from "../../components/Post/Post";
import { convertDatestringToDate } from "../../helpers/convertDate";
import useAuth from "../../hooks/auth.hook";
import { postsApi } from "../../store/services/posts.service";
import { userApi } from "../../store/services/user.servive";
import "./UserPage.scss";

export const UserPage: FC = () => {
  const { userId = 0 } = useParams();
  const { data: userInfo, isLoading } = userApi.useGetUserByIdQuery(+userId);
  const { data: posts } = postsApi.useGetPostByUserIdQuery(+userId);
  const { logout, id } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return isLoading ? (
    <Loader />
  ) : !userInfo ? (
    <h2>Пользователь не найден</h2>
  ) : (
    <>
      <div className='user_info'>
        <img src={userInfo.avatar} alt='' />
        <h2>{userInfo.name}</h2>
        <p>Зарегистрирован: {convertDatestringToDate(userInfo.registratedat)}</p>
        {id === userId && <RedButton onClick={handleLogout}>Выйти</RedButton>}
      </div>
      <div className='user_posts'>
        <h2>Посты пользователя:</h2>
        {!posts ? <h2>У пользователя нет постов</h2> : posts.map((post) => <Post post={post} key={post.id} />)}
      </div>
    </>
  );
};
