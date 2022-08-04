import { FC, FormEventHandler } from "react";
import "./OrderSelect.scss";

interface PropType {
  handleChange: FormEventHandler;
}

export const OrderSelect: FC<PropType> = ({ handleChange }) => {
  return (
    <div className='order_select'>
      <select name='order' onChange={handleChange} defaultValue={"new"}>
        <option value='new'>сначала новые</option>
        <option value='rated'>сначала популярные</option>
      </select>
    </div>
  );
};
