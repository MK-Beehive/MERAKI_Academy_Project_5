import { createSlice } from "@reduxjs/toolkit";

export const selectedSlice = createSlice({
    name:"exp",
    
    initialState:{
        selectedProject:(localStorage.getItem("selectedProject") || null),
        selectetUserProfile:null,
        selectedoffer_id:(localStorage.getItem("selectedoffer_id") || null),
    },
    reducers:{
        setSelectedProject:(state,action)=>{
            console.log('selectedProject',action.payload)
            state.selectedProject =action.payload;
            localStorage.setItem("selectedProject",( action.payload));
        },
        setselectetUserProfile:(state,action)=>{
            console.log('setselectetUserProfile',action.payload)
            state.selectetUserProfile =action.payload;
    
        },  
         setselectedoffer_id:(state,action)=>{
            console.log('setselectedoffer_id',action.payload)
            state.selectedoffer_id =action.payload;
            localStorage.setItem("selectedoffer_id",( action.payload));

    
        },

    }
    })
    
export const {setSelectedProject ,setselectetUserProfile , setselectedoffer_id }= selectedSlice.actions
    

    export default selectedSlice.reducer