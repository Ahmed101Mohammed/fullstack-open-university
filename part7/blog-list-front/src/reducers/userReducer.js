import { createSlice } from "@reduxjs/toolkit";

const user = createSlice(
    {
        name: 'user',
        initialState: null,
        reducers: {
            setUser(state, action)
            {
                const user = action.payload
                return user
            },
            removeUser(state, action)
            {
                return null
            }
        }
    }
)

export const { setUser, removeUser } = user.actions
export default user.reducer