import { configureStore } from '@reduxjs/toolkit'
import login from '../reducer/user'
export default configureStore({
    reducer: {
        user: login,
    },
})