import { createSlice } from "@reduxjs/toolkit";

export const selectedSlice = createSlice({
    name:"exp",
    
    initialState:{
        selectedProject:null,
        selectetUserProfile:null
    },
    reducers:{
        setSelectedProject:(state,action)=>{
            console.log('selectedProject',action.payload)
            state.selectedProject =action.payload;
    
        },
        setselectetUserProfile:(state,action)=>{
            console.log('setselectetUserProfile',action.payload)
            state.selectetUserProfile =action.payload;
    
        },

    }
    })
    
export const {setSelectedProject ,setselectetUserProfile }= selectedSlice.actions
    

    export default selectedSlice.reducer