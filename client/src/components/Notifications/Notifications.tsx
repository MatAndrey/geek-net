import { useAppSelector } from "../../hooks/redux.hook";
import INotification from "../../models/INotification";
import "./Notifications.scss";

export const NotificationContainer = (): JSX.Element => {
  const notifications = useAppSelector((state) => state.notificationsReducer);

  return (
    <div className='notification_container'>
      {notifications.map((not: INotification) => (
        <div className={["notification", not.type].join(" ")} key={not.id}>
          <p>{not.text}</p>
        </div>
      ))}
    </div>
  );
};
