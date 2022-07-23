import { FC, useEffect, useState } from "react";
import { FiKey } from "react-icons/fi";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import "./Fields.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { authSlice } from "../../store/reducers/auth.slice";
import { validate } from "../../helpers/validation";

export const DoublePass: FC = () => {
  const [inputType, setInputType] = useState("password");
  const [isTouched, setIsTouched] = useState(false);

  const { doubPass, password, doubPassMas } = useAppSelector((state) => state.authReducer);
  const { setDoubPass, setDoubPassMas } = authSlice.actions;
  const dispatch = useAppDispatch();

  const togglePassword = (e) => {
    e.preventDefault();
    setInputType(inputType === "password" ? "text" : "password");
  };

  useEffect(() => {
    if (isTouched) {
      dispatch(setDoubPassMas(validate("doubPass", `${password} ${doubPass}`)));
    }
  }, [isTouched, password, doubPass, dispatch, setDoubPassMas]);

  return (
    <div className='row'>
      <div className='field'>
        <FiKey size={20} className='icon' />
        <input
          type={inputType}
          required
          name='password'
          value={doubPass}
          onChange={(e) => dispatch(setDoubPass(e.target.value))}
          onBlur={() => setIsTouched(true)}
          placeholder='Повторите пароль'
          tabIndex={2}
        />
        <div onClick={togglePassword} className='icon'>
          <AiOutlineEyeInvisible color='#000' size={20} />
        </div>
      </div>
      <p className='validation_message'>{doubPassMas}</p>
    </div>
  );
};
