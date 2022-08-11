import { FC, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/auth.hook";
import { useTheme } from "../../hooks/theme.hook";
import { BsMoon, BsSun } from "react-icons/bs";
import { GoSearch } from "react-icons/go";

export const Header: FC = () => {
  const { name, avatar, id } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const switchTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    setIsMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/search-results", { state: search });
    setSearch("");
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
            <div className='search_bar'>
              <div className='search'>
                <form onSubmit={handleSearch}>
                  <input type='text' onChange={(e) => setSearch(e.target.value)} value={search} onSubmit={handleSearch} placeholder='Поиск' />
                  <button onClick={handleSearch}>
                    <GoSearch />
                  </button>
                </form>
              </div>
            </div>
          </li>
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
            <Link to='/saved-posts' onClick={() => setIsMenuOpen(false)}>
              Сохранённые
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
