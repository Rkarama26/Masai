import type { FeedbackState, Feedback } from "../dataTypes/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


 export const initialState: FeedbackState = {
    feedbackList: [],
}

const feedbackSlice = createSlice({

    name: "feedback",
    initialState,
    reducers: {
        addFeedback: (state, action: PayloadAction<Feedback>) => {
            state.feedbackList.push(action.payload);
        },
        clearFeedback: (state) => {
            state.feedbackList = []
        }
    }
})

export const { addFeedback, clearFeedback } = feedbackSlice.actions;
export default feedbackSlice.reducer;