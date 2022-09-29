import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../../components/Buttons/PrimaryButton";
import { SecondaryButton } from "../../components/Buttons/SecondaryButton";
import { createAvatar } from "../../helpers/createAvatar";
import useAuth from "../../hooks/auth.hook";
import useNotification from "../../hooks/notifications.hook";
import { userApi } from "../../store/services/user.servive";
import "./UserSettingsPage.scss";

export const UserSettingsPage: FC = () => {
  const { id } = useAuth();
  const navigate = useNavigate();
  const { data } = userApi.useGetUserByIdQuery(+id);
  const [updateMutation] = userApi.useUpdateMutation();
  const { error } = useNotification();
  const [newData, setNewData] = useState({
    name: "",
    avatar: "",
    oldPassword: "",
    newPassword: "",
    doublePassword: "",
  });

  useEffect(() => {
    if (data) {
      setNewData((prev) => ({ ...prev, ...data }));
    }
  }, [data]);

  const handleChange = (e) => {
    setNewData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const changeAvatar = () => {
    setNewData((prev) => ({ ...prev, avatar: createAvatar() }));
  };

  const handleSubmit = async () => {
    if (newData.newPassword === newData.doublePassword) {
      if (!newData.oldPassword) {
        return error("Введите пароль");
      }
      try {
        await updateMutation({
          name: newData.name,
          password: newData.newPassword,
          avatar: newData.avatar,
          oldPassword: newData.oldPassword,
        }).unwrap();
      } catch (e: any) {
        error(e.data.message);
      }

      navigate("/login");
    }
  };

  return (
    <div className='user_settings'>
      <div className='form_wrapper'>
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            <img src={newData.avatar} alt='аватар' />
          </label>
          <label>
            <SecondaryButton onClick={changeAvatar}>Изменить аватар</SecondaryButton>
          </label>

          <label>
            <input type='text' placeholder='имя' value={newData.name} name='name' onChange={handleChange} />
          </label>
          <label>
            <input type='password' placeholder='старый пароль' name='oldPassword' onChange={handleChange} />
          </label>
          <label>
            <input type='password' placeholder='новый пароль' name='newPassword' onChange={handleChange} />
          </label>
          <label>
            <input type='password' placeholder='повторите пароль' name='doublePassword' onChange={handleChange} />
          </label>
          <PrimaryButton onClick={handleSubmit}>Сохранить</PrimaryButton>
        </form>
      </div>
    </div>
  );
};
