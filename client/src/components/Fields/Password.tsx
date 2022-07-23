import { FC, useEffect, useState } from "react";
import { FiKey } from "react-icons/fi";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import "./Fields.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { authSlice } from "../../store/reducers/auth.slice";
import { validate } from "../../helpers/validation";

interface PropType {
  validation: boolean;
}

export const Password: FC<PropType> = ({ validation }) => {
  const [inputType, setInputType] = useState("password");
  const { password, passMas } = useAppSelector((state) => state.authReducer);
  const { setPassword, setPassMas } = authSlice.actions;
  const dispatch = useAppDispatch();
  const [isToched, setIsToched] = useState(false);

  useEffect(() => {
    if (isToched && validation) {
      dispatch(setPassMas(validate("password", password)));
    }
  }, [password, dispatch, isToched, setPassMas, validation]);

  const togglePassword = (e) => {
    e.preventDefault();
    setInputType(inputType === "password" ? "text" : "password");
  };

  return (
    <div className='row'>
      <div className='field'>
        <FiKey size={20} className='icon' />
        <input
          type={inputType}
          required
          name='password'
          value={password}
          onChange={(e) => dispatch(setPassword(e.target.value))}
          onBlur={() => setIsToched(true)}
          placeholder='Пароль'
          tabIndex={2}
        />
        <div onClick={togglePassword} className='icon'>
          <AiOutlineEyeInvisible color='#000' size={20} />
        </div>
      </div>
      <p className='validation_message'>{passMas}</p>
    </div>
  );
};
