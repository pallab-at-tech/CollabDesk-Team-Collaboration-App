import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    all_message: []
}

const chatSlice = createSlice({
    name: 'chat',
    initialState: initialValue,
    reducers: {
        setMessageDetails: (state, action) => {
            state.all_message = action.payload?.all_message
        }
    }
})

export const { setMessageDetails } = chatSlice.actions
export default chatSlice.reducer