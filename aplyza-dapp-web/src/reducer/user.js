import { createSlice,PayloadAction } from '@reduxjs/toolkit'
import {moralisClient} from "../index";
export const user = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        login: (state,action) => {
            const user=action.payload;
            console.log(user)
            return {
                ...state,
                user
            }
        },
        logout: (state) => {
            state = null
            return {
                ...state,
                state
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { login,logout } = user.actions

export default user.reducer