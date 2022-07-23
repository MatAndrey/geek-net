import React, { ChangeEventHandler, FC } from "react";

interface PropType {
  children: React.ReactNode;
  value: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const Checkbox: FC<PropType> = ({ children, value, onChange }) => {
  return (
    <label className='checkbox_container'>
      {children}
      <input type='checkbox' checked={value} onChange={onChange} />
      <span className='checkmark'></span>
    </label>
  );
};
