import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const state = notification[0]
  const messsage = notification[1]
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if(!messsage) return
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification