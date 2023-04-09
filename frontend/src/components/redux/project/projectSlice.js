import { createSlice } from "@reduxjs/toolkit";
const projectSlice = createSlice({
    name:"project",
    initialState: {project:[]},
    reducers:{
        setProject : (state,action)=>{
            console.log(action.payload)
            state.project = action.payload
}
}
})

export const {setProject} = projectSlice.actions
export default projectSlice.reducer