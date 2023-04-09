import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./project/projectSlice"

import authReducer from "./reducers/auth/index" //sahar -- auth s 

export default configureStore({
reducer:{

project: projectReducer

    auth : authReducer

}
})