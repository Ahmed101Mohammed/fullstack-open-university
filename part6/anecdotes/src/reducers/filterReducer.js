import { createSlice } from "@reduxjs/toolkit"

const filterReducer = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filter(state, action)
    {
      const newState = action.payload
      return newState
    }
  }
})

export const { filter } = filterReducer.actions
export default filterReducer.reducer