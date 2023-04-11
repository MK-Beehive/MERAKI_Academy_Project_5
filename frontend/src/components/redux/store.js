import { configureStore } from "@reduxjs/toolkit";

import projectReducer from "./project/projectSlice"

import skillReducer from "./skills/skillsSlice"

import authRrducer from "./reducers/auth/index"




export default configureStore({
reducer:{

    auth:authReducer,
    project: projectReducer,
    skill:skillReducer,


}
})