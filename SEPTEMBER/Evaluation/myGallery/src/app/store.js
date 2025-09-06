import { configureStore } from "@reduxjs/toolkit";
import galleryReducer from "../slice/gallerySlice";



export const store = configureStore({
    reducer: {
        gallery: galleryReducer,
    }
})

