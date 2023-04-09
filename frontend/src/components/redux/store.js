import { configureStore } from "@reduxjs/toolkit";
import authRrducer from "./reducers/auth";


export default configureStore({
reducer:{
    auth:authRrducer,

}


})