import { createSlice } from '@reduxjs/toolkit'

const initialValue = {
    _id : "",
    name: "",
    email: "",
    roles: [],
    avatar: "",
    verify_email: false,
}

const userSlice = createSlice({
    name : 'user',
    initialState : initialValue,
    reducers : {
        setUserDetails : (state , action) =>{
            state._id = action.payload?._id
            state.name = action.payload?.name
            state.email = action.payload?.email
            state.roles = [...action.payload?.roles]
            state.avatar = action.payload?.avatar
            state.verify_email = action.payload?.verify_email
        },
        setUserLogout : (state , action) =>{
            state._id = ""
            state.name = ""
            state.email = ""
            state.roles = []
            state.avatar = ""
            state.verify_email = false
        }
    }
})

export const {setUserDetails , setUserLogout } = userSlice.actions
export default userSlice.reducer