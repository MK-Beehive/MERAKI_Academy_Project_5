import { createSlice } from "@reduxjs/toolkit";

export const expSlice = createSlice({
    name:"experiances",
    
    initialState:{
        experiances:[],experianceUser:"",
    },
    reducers:{
        setexperiances:(state, action)=>{ 
            state.experiances = action.payload;
            console.log('experiances12356',action.payload)
        },
        setExperianceforUser: (state, action) => {
            console.log("set skills for skills",action.payload)
        
            state.experianceUser = action.payload;
          },
        
    }
    })
    
export const {setexperiances,setExperianceforUser}= expSlice.actions;
    

    export default expSlice.reducer