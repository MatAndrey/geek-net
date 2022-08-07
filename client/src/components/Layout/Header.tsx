import { FC, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/auth.hook";
import { useTheme } from "../../hooks/theme.hook";
import { BsMoon, BsSun } from "react-icons/bs";

export const Header: FC = () => {
  const { name, avatar, id } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const switchTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    setIsMenuOpen(false);
  };

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
            <div className='theme_switch'>
              <button onClick={switchTheme}>{theme === "dark" ? <BsMoon size={22} fill='#fff' /> : <BsSun size={24} fill='#fff' />}</button>
            </div>
          </li>
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
        <FiMenu stroke='#fff' size={22} />
      </button>
    </header>
  );
};
