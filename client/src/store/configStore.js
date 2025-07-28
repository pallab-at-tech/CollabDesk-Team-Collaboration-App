import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../store/userSlice"
import teamReducer from "../store/teamSlice"
import taskReducer from "../store/taskSlice"

export const store = configureStore({
  reducer: {
    user : userReducer,
    team : teamReducer,
    task : taskReducer,
  },
})