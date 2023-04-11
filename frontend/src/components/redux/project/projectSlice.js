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
    // console.log("projectoo: ",action.payload);

  },
}
})

export const {setProject,setProjectByUser } = projectSlice.actions

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