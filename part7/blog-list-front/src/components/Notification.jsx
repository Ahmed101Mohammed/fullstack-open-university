import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (!notification) return;
  let style = { color: "green" };
  !notification[0] ? (style.color = "red") : true;
  return <p style={style}>{notification}</p>;
};

export default Notification;
