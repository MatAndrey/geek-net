import { FC, useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import { validate } from "../../helpers/validation";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { authSlice } from "../../store/reducers/auth.slice";
import "./Fields.scss";

interface PropType {
  validation: boolean;
}

export const Name: FC<PropType> = ({ validation }) => {
  const { name, nameMas } = useAppSelector((state) => state.authReducer);
  const { setName, setNameMas } = authSlice.actions;
  const dispatch = useAppDispatch();
  const [isToched, setIsToched] = useState(false);

  useEffect(() => {
    if (isToched && validation) {
      dispatch(setNameMas(validate("name", name)));
    }
  }, [name, dispatch, isToched, setNameMas, validation]);

  return (
    <div className='row'>
      <div className='field'>
        <FiUser size={20} />
        <input
          type='text'
          required
          name='name'
          value={name}
          onChange={(e) => dispatch(setName(e.target.value))}
          onBlur={() => setIsToched(true)}
          placeholder='Имя'
          tabIndex={1}
        />
      </div>
      <p className='validation_message'>{nameMas}</p>
    </div>
  );
};
