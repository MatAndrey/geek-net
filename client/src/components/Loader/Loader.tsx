import { FC } from "react";
import "./Loader.scss";

export const Loader: FC = () => {
  return (
    <div className='loader_outer'>
      <div className='loader_inner'></div>
    </div>
  );
};
