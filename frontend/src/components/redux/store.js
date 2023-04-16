import { configureStore } from "@reduxjs/toolkit";

import projectReducer from "./project/projectSlice"

import skillReducer from "./skills/skillsSlice"


import authReducer from "./reducers/auth/index"
import experiancesRrducer from "./reducers/experiances/index"





import offerReducer from "./offers/offerSlice"




export default configureStore({
reducer:{

    auth:authReducer,
    project: projectReducer,
    skill:skillReducer,
    experiances:experiancesRrducer,

    offer:offerReducer,



}
})