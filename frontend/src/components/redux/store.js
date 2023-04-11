import { configureStore } from "@reduxjs/toolkit";

import projectReducer from "./project/projectSlice"
import authRrducer from "./reducers/auth/index"



export default configureStore({
reducer:{
    auth:authRrducer,

project: projectReducer



}
})