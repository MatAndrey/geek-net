import { FC, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { Checkbox } from "../../components/Fields/Checkbox";
import { Name } from "../../components/Fields/Name";
import { Password } from "../../components/Fields/Password";
import useAuth from "../../hooks/auth.hook";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { useLoginMutation } from "../../services/user.servive";
import { authSlice } from "../../store/reducers/auth.slice";
import "./LoginPage.scss";

export const LoginPage: FC = () => {
  const [error, setError] = useState("");
  const authForm = useAppSelector((state) => state.authReducer);
  const { setRemember, resetForm } = authSlice.actions;
  const dispatch = useAppDispatch();
  const [loginMutation] = useLoginMutation();
  const { login } = useAuth();

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      if (authForm.password !== "" && authForm.name !== "") {
        dispatch(resetForm());
        try {
          const res = await loginMutation({ name: authForm.name, password: authForm.password, remember: authForm.remember });
          if (res && res["data"]) {
            login(res["data"], authForm.remember);
          }
          if (res && res["error"] && res["error"].status === 401) {
            setError(res["error"]["data"].message);
          }
        } catch (e) {
          console.log(e);
        }
      }
    },
    [authForm, login, loginMutation, dispatch, resetForm]
  );

  return (
    <div className='login_page'>
      <div className='form_wrapper'>
        <h2>Вход</h2>
        <form>
          <Name validation={false} />
          <Password validation={false} />
          <div className='row'>
            <div className='column left'>
              <Checkbox value={true} onChange={() => dispatch(setRemember(!authForm.remember))}>
                Запомнить меня
              </Checkbox>
            </div>
            <div className='column right'>
              <Link to='/signup'>Ещё нет аккаунта?</Link>
            </div>
          </div>
          <div className='row'>
            <button className='submit' tabIndex={3} onClick={handleLogin}>
              Войти
            </button>
            <p>{error}</p>
          </div>
        </form>
      </div>
    </div>
  );
};
