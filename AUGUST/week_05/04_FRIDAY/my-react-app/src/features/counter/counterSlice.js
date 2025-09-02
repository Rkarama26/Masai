import { createSlice } from '@reduxjs/toolkit'

const initialState = { count: 0 }

const counterSlice = createSlice({
    name: "counter",// name of slice
    initialState,
    reducers: {
        increament: state => { state.count += 1 },
        decrement: state => { state.count -= 1 },
        reset: state => { state.count = 0 }
   
    }
});

export const {increament, decrement, reset} = counterSlice.actions;

export default counterSlice.reducer;  