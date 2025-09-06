import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



const API_URL = "https://auth-d2bdd-default-rtdb.firebaseio.com/gallery.json";


export const fetchImages = createAsyncThunk("gallery/fetchImages", async () => {
    const res = await axios.get(API_URL);
    // Firebase returns an object 
    const data = res.data || {};
    return Object.entries(data).map(([id, value]) => ({
        id,
        ...value,
    }));
}); 

export const addImage = createAsyncThunk(
    "gallery/addImage",
    async ({ url, title, tags }) => {
        const newImage = { url, title, tags };
        console.log("uloading to firebase", newImage)
        const res = await axios.post(API_URL, newImage);
        return { id: res.data.name, ...newImage }; 
    }
);

const initialState = {
    images: [],
    loading: false,
    error: null,
}

const gallerySlice = createSlice({
    name: "gallery",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(fetchImages.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchImages.fulfilled, (state, action) => {
                state.loading = false;
                state.images = action.payload;
            })
            .addCase(fetchImages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addImage.fulfilled, (state, action) => {
                state.images.push(action.payload);
            });
    }

})


export default gallerySlice.reducer;