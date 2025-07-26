import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    name: "",
    description: "",
    organization_type: "",
    member: []
}

const teamSlice = createSlice({
    name : "team",
    initialState : initialValue,
    reducers : {
        setTeamDetails : (state , action) =>{
            state.name = action.payload?.name
            state.description = action.payload?.description
            state.organization_type = action.payload?.organization_type
            state.member = [...action.payload?.member]
        }
    }
})

export const {setTeamDetails} = teamSlice.actions
export default teamSlice.reducer