import { createSlice } from "@reduxjs/toolkit";
const projectSlice = createSlice({
    name:"project",
    initialState: {project:[], majority:[], status:[]}, 
    reducers:{
        setProject : (state,action)=>{
       
            console.log(action.payload)
            state.project = action.payload
},
setMajority: (state,action)=>{
    console.log(action.payload)
    state.majority = action.payload
},
setproject:  (state,action)=>{
    state.project.push(action.payload) 
},
}
})

export const {setProject,setMajority,setstatusproject,setproject} = projectSlice.actions
export default projectSlice.reducer