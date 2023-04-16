import { createSlice } from "@reduxjs/toolkit";

export const expSlice = createSlice({
    name:"experiances",
    
    initialState:{
        experiances:[]
    },
    reducers:{
        setexperiances:(state,action)=>{ 
                    //    console.log('experiances12356',action.payload)

            state.experiances =action.payload;
            console.log('experiances12356',action.payload)

        },
        
    }
    })
    
export const {setexperiances,setExperianceByUser}= expSlice.actions
    

    export default expSlice.reducer