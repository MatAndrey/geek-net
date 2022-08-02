import { FC } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/auth.hook";

export const Header: FC = () => {
  const { name, avatar, id } = useAuth();
  return (
    <header>
      <div className='logo'>
        <Link to='/'>
          <h1>GeekNet</h1>
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to='/create-post'>Создать пост</Link>
            {name ? (
              <Link to={`/user/${id}`}>
                {name}
                <img src={avatar} alt='' />
              </Link>
            ) : (
              <Link to='/login'>Войти</Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};
