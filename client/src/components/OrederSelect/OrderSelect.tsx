import { FC, FormEventHandler } from "react";
import "./OrderSelect.scss";

interface PropType {
  handleChange: FormEventHandler;
}

export const OrderSelect: FC<PropType> = ({ handleChange }) => {
  return (
    <div className='order_select'>
      <select name='order' onChange={handleChange} defaultValue={"createdat"}>
        <option value='createdat'>сначала новые</option>
        <option value='likes'>сначала популярные</option>
      </select>
    </div>
  );
};
