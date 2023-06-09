import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name:"auth",
    
    initialState:{
       userId:(localStorage.getItem("userId") || null),
       token:(localStorage.getItem("token") || null),
       userinfo:(JSON.parse(localStorage.getItem("userinfo")) || null),
       userdata:(JSON.parse(localStorage.getItem("userdata")) || null),
       isLoggedIn:(localStorage.getItem("token") ? true : false),
       isgoogleUser:false,
       googleUser: null
    },
    reducers:{
        setLogin:(state,action)=>{
            console.log('setLogin_____________________',action.payload)
            state.token =action.payload;
            state.isLoggedIn=true;
            localStorage.setItem("token",( action.payload));
        },
        setUserId:(state,action)=>{
            console.log('setUserId_____________________',action.payload)            
            state.userId=action.payload;
            localStorage.setItem("userId",JSON.stringify(  action.payload));
    
        },
        setUserInfo:(state,action)=>{
            console.log('userinfo_____________________',action.payload)            
            state.userinfo=action.payload;
            localStorage.setItem("userinfo",JSON.stringify(  action.payload));

        },
        setUserdata:(state,action)=>{
            console.log('setUserdata_____________________',action.payload)            
            state.userdata=action.payload;
            localStorage.setItem("userdata",JSON.stringify(action.payload));
            // localStorage.setItem("userdata",(action.payload));

        },
        googleUser:(state,action)=>{
            console.log('------googleUserAUTH-----',action.payload)            
            state.isgoogleUser=true;
            state.googleUser=action.payload;
            //localStorage.setItem("userdata",JSON.stringify(  action.payload));

        },
        setLogout:(state,action)=>{
            console.log('setLogout_____________________',action.payload)
            state.token =null;
             state.userId=null;
             state.userinfo=null;
            state.isLoggedIn=false;
            localStorage.clear();
        }
         
        
    
    }
    
    })
    
    export const {setLogin,setUserId,setLogout ,setUserInfo ,setUserdata,googleUser}= authSlice.actions
    

    export default authSlice.reducer