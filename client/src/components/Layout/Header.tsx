import { FC, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/auth.hook";

export const Header: FC = () => {
  const { name, avatar, id } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header>
      <div className='logo'>
        <Link to='/'>
          <h1>GeekNet</h1>
        </Link>
      </div>
      <nav className={isMenuOpen ? "fullscreen" : "inline"}>
        <ul>
          <li>
            <Link to='/create-post' onClick={() => setIsMenuOpen(false)}>
              Создать пост
            </Link>
          </li>
          <li>
            {name ? (
              <Link to={`/user/${id}`} onClick={() => setIsMenuOpen(false)}>
                {name}
                <img src={avatar} alt='' />
              </Link>
            ) : (
              <Link to='/login' onClick={() => setIsMenuOpen(false)}>
                Войти
              </Link>
            )}
          </li>
        </ul>
      </nav>
      <button className='menu_button' onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <FiMenu color='#fff' size={22} />
      </button>
    </header>
  );
};
