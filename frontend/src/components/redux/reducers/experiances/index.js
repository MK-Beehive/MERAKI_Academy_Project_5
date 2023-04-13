import { createSlice } from "@reduxjs/toolkit";

export const expSlice = createSlice({
    name:"exp",
    
    initialState:{
        experiances:[]
    },
    reducers:{
        setexperiances:(state,action)=>{
            console.log('experiances',action.payload)
            state.experiances =action.payload;
    
        },
    }
    })
    
export const {setexperiances}= expSlice.actions
    

    export default expSlice.reducer