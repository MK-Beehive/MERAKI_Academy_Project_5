import { configureStore } from "@reduxjs/toolkit";


import authReducer from "./reducers/auth/index" //sahar -- auth s 

export default configureStore({
reducer:{
    auth : authReducer
}


})