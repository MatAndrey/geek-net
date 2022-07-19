import { FC } from "react";
import { Link } from "react-router-dom";
import "./NotFoundPage.scss";

export const NotFoundPage: FC = () => {
  return (
    <div className='not_found_page'>
      <div className='text_wrapper'>
        <h1>404</h1>
        <p>Страница не найдена</p>
        <Link to='/'>На главную</Link>
      </div>
    </div>
  );
};
