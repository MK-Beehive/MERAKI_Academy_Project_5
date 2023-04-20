import { createSlice } from "@reduxjs/toolkit";

export const balanceSlice = createSlice({
    name:"balance",
    
    initialState:{
        balance:{},
    },
    reducers:{
        setBalance:(state, action)=>{ 
            state.experiances = action.payload;
            console.log('balace Redux',action.payload)
        },
      
        
    }
    })
    
export const {setBalance}= balanceSlice.actions;
    

    export default balanceSlice.reducer