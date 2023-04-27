import { createSlice } from "@reduxjs/toolkit";
const projectSlice = createSlice({
    name:"project",
    initialState: {project:[], majority:[], status:[], notification :[] , messageNotification:[], roomid:0, message: [],allprojectbyuserId:[]},
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
  setMajority: (state,action)=>{
    console.log(action.payload)
    state.majority = action.payload
},
setproject:  (state,action)=>{
    console.log(action.payload.project[0])
    state.project= (action.payload.project[0]) 
},
setnotification:(state,action)=>{
    console.log(action.payload)
    state.notification= (action.payload)
},
setmessagenotification :(state,action)=>{
    console.log(action.payload)
    state.messageNotification= (action.payload)
},
setRoomId :(state,action)=>{
    console.log(action.payload)
    state.roomid= action.payload
},
setallmessage : (state,action)=>{
    console.log(action.payload)
    state.message= (action.payload)
},
setallprojectbyuserId :(state,action)=>{
    console.log(action.payload)
    state.allprojectbyuserId= (action.payload)
},
}
})

export const {setProject,setMajority,setstatusproject,setproject,setProjectByUser,setnotification,setmessagenotification,setRoomId,setallmessage,setallprojectbyuserId} = projectSlice.actions

export default projectSlice.reducer