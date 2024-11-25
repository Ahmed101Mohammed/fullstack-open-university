import { createSlice } from "@reduxjs/toolkit"

const notificationReducer = createSlice({
  name: 'notification',
  initialState: [true, null],
  reducers: {
    displayNotification(state, action)
    {
      const [isNotification, message] = action.payload
      const newState = [isNotification, message]
      return newState
    },
    removeNotification(state, action)
    {
      return [true, null]
    }
  }
})

export const { displayNotification, removeNotification } = notificationReducer.actions

export const setNotification = (notification, time) =>
{
  return async dispatch =>
  {
    dispatch(displayNotification(notification))
    setTimeout(() =>
    {
      dispatch(removeNotification())
    }, time*1000)
  }
}
export default notificationReducer.reducer