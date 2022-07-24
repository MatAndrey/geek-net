import { FC, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PrimaryButton } from "../../components/Buttons/PrimaryButton";
import { Checkbox } from "../../components/Fields/Checkbox";
import { DoublePass } from "../../components/Fields/DoublePass";
import { Name } from "../../components/Fields/Name";
import { Password } from "../../components/Fields/Password";
import { validate } from "../../helpers/validation";
import useAuth from "../../hooks/auth.hook";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { useSignUpMutation } from "../../store/services/user.servive";
import { authSlice } from "../../store/reducers/auth.slice";
import "./LoginPage.scss";

export const SignUpPage: FC = () => {
  const [isCorrect, setIsCorrect] = useState(true);
  const [error, setError] = useState("");
  const authForm = useAppSelector((state) => state.authReducer);
  const { setRemember, resetForm, setDoubPassMas, setNameMas, setPassMas } = authSlice.actions;
  const dispatch = useAppDispatch();
  const [signUp] = useSignUpMutation();
  const { login } = useAuth();

  const handleSignUp = useCallback(
    async (e) => {
      e.preventDefault();
      if (isCorrect && authForm.password !== "" && authForm.name !== "" && authForm.password === authForm.doubPass) {
        dispatch(resetForm());
        try {
          const res = await signUp({ name: authForm.name, password: authForm.password, remember: authForm.remember });
          if (res && res["data"]) {
            login(res["data"], authForm.remember);
          }
          if (res && res["error"] && res["error"].status === 501) {
            setError("Имя занято");
          }
        } catch (e) {
          console.log(e);
        }
      } else {
        dispatch(setDoubPassMas(validate("doubPass", `${authForm.password} ${authForm.doubPass}`)));
        dispatch(setPassMas(validate("password", authForm.password)));
        dispatch(setNameMas(validate("name", authForm.name)));
      }
    },
    [authForm, signUp, login, dispatch, resetForm, isCorrect, setDoubPassMas, setNameMas, setPassMas]
  );

  useEffect(() => {
    if (authForm.nameMas === "" && authForm.passMas === "" && authForm.doubPassMas === "") {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  }, [authForm, setIsCorrect]);

  return (
    <div className='login_page'>
      <div className='form_wrapper'>
        <h2>Регистрация</h2>
        <form>
          <Name validation={true} />
          <Password validation={true} />
          <DoublePass />
          <div className='row'>
            <div className='column left'>
              <Checkbox value={authForm.remember} onChange={() => dispatch(setRemember(!authForm.remember))}>
                Запомнить меня
              </Checkbox>
            </div>
            <div className='column right'>
              <Link to='/login'>Уже есть аккаунт?</Link>
            </div>
          </div>
          <div className='row'>
            <PrimaryButton tabIndex={4} disabled={!isCorrect} onClick={handleSignUp}>
              Зарегистрироваться
            </PrimaryButton>
            <p>{error}</p>
          </div>
        </form>
      </div>
    </div>
  );
};
