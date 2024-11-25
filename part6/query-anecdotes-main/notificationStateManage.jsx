import { createContext, useContext, useReducer } from "react"
const notificationContext = createContext()

const notificationReducer = (state, action) =>
{
  const actionName = action.type
  const actionPayload = action.payload

  switch(actionName)
  {
    case 'notify':
      return actionPayload
    default:
      return state
  }
}

export const NotificationContextProvider = (props) =>
{
  const [notification, notificationDispatch] = useReducer(notificationReducer)
  return (
    <notificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </notificationContext.Provider>
  )
}

export const useNotificationState = () =>
  {
    const notificationStateManage = useContext(notificationContext)
    return notificationStateManage[0]
  }

export const useNotificationDispatch = () =>
  {
    const notificationStateManage = useContext(notificationContext)
    return notificationStateManage[1]
  }

export default notificationContext