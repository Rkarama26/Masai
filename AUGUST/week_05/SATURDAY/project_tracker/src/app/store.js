import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "../redux/projectSlice"; // make sure the path is correct



export const store = configureStore({
    reducer: {
        projects: projectReducer
    }
})