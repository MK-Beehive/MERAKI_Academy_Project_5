import { createSlice } from "@reduxjs/toolkit";

export const selectedSlice = createSlice({
    name:"exp",
    
    initialState:{
        selectedProject:null
    },
    reducers:{
        setSelectedProject:(state,action)=>{
            console.log('selectedProject',action.payload)
            state.selectedProject =action.payload;
    
        },
    }
    })
    
export const {setSelectedProject}= selectedSlice.actions
    

    export default selectedSlice.reducer