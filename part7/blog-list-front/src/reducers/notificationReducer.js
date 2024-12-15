import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    exposeNotification(state, action) {
      const notificationBody = action.payload;
      return notificationBody;
    },
  },
});

export const { exposeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
