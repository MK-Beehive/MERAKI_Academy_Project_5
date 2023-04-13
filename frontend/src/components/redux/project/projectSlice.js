import { createSlice } from "@reduxjs/toolkit";
const projectSlice = createSlice({
    name:"project",
    initialState: {project:[], majority:[], status:[]}, 
    reducers:{
        setProject : (state,action)=>{
       
            console.log(action.payload)
            state.project = action.payload

            
},
setProjectByUser: (state, action) => {
    const userId = action.payload.userId;
    const projects = state.project.filter((project) => project.user_id === userId);
    state.project = action.payload;
    console.log("projectoo: ",action.payload);

  },
  setMajority: (state,action)=>{
    console.log(action.payload)
    state.majority = action.payload
},
setproject:  (state,action)=>{
    console.log(action.payload.project[0])
    state.project= (action.payload.project[0]) 
},
}
})



export const {setProject,setMajority,setstatusproject,setproject,setProjectByUser} = projectSlice.actions

export default projectSlice.reducer