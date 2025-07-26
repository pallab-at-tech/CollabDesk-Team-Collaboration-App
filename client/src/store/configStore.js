import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../store/userSlice"
import teamReducer from "../store/teamSlice"

export const store = configureStore({
  reducer: {
    user : userReducer,
    team : teamReducer
  },
})