import { configureStore } from "@reduxjs/toolkit";

import projectReducer from "./project/projectSlice"

import skillReducer from "./skills/skillsSlice"

import authRrducer from "./reducers/auth/index"
import experiancesRrducer from "./reducers/experiances/index"






export default configureStore({
reducer:{

    auth:authRrducer,
    project: projectReducer,
    skill:skillReducer,
    experiances:experiancesRrducer


}
})