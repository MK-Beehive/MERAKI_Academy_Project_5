import { createSlice } from "@reduxjs/toolkit";
const projectSlice = createSlice({
    name:"project",
    initialState: {project:[]},
    reducers:{
        setProject : (state,action)=>{
            console.log(action.payload)
            state.project = action.payload
            
},
setProjectByUser: (state, action) => {
    const userId = action.payload.userId;
    const projects = state.project.filter((project) => project.user_id === userId);
    state.project = action.payload;
    // console.log("projectoo: ",action.payload);

  },
}
})

export const {setProject,setProjectByUser } = projectSlice.actions
export default projectSlice.reducer