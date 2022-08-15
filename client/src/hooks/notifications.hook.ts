import { addNotification, removeNotification } from "../store/reducers/notifications.slice";
import INotification from "../models/INotification";
import { useAppDispatch } from "./redux.hook";

const useNotification = () => {
  const dispatch = useAppDispatch();

  const create = ({ type = "info", text = "" }: INotification) => {
    const notificationId = Math.random();

    dispatch(addNotification({ type, text, id: notificationId }));

    setTimeout(() => {
      dispatch(removeNotification(notificationId));
    }, 2500);
  };

  const info = (text) => {
    create({ type: "info", text });
  };

  const error = (text) => {
    create({ type: "error", text });
  };

  return { create, info, error };
};

export default useNotification;
