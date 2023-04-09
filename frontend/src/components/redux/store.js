import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./project/projectSlice"

export default configureStore({
reducer:{
project: projectReducer
}
})