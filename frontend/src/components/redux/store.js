import { configureStore } from "@reduxjs/toolkit";

import projectReducer from "./project/projectSlice"
import skillReducer from "./skills/skillsSlice"

import authReducer from "./reducers/auth/index" //sahar -- auth s 

export default configureStore({
reducer:{
 auth:authReducer,

project: projectReducer,

skill:skillReducer,


}
})