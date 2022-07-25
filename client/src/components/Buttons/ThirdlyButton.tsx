import { FC, MouseEventHandler } from "react";
import "./Buttons.scss";

interface PropType {
  children: React.ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  [x: string]: any;
}

export const ThirdlyButton: FC<PropType> = ({ children, onClick, ...props }) => {
  return (
    <button onClick={onClick} className='thirdly_button' {...props}>
      {children}
    </button>
  );
};
