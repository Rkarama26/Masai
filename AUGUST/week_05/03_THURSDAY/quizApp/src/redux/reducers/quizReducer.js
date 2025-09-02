import {
    FETCH_QUIZ_REQUEST,
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZ_FAIL,
    SUBMIT_ANSWER,
    SKIP_QUESTION,
    RESET_QUIZ,
} from "../actions/quizActions";





const initialState = {
    loading: false,
    questions: [],
    error: null,
    currentQuestionIndex: 0,
    score: 0,
};

export const quizReducer = (state = initialState, action) => {


    switch (action.type) {
        case FETCH_QUIZ_REQUEST:
            return { ...state, loading: true, error: null };

        case FETCH_QUIZ_SUCCESS:
            return { ...state, loading: false, questions: action.payload };

        case FETCH_QUIZ_FAIL:
            return { ...state, loading: false, error: action.payload };

        case SUBMIT_ANSWER:
            return {
                ...state,
                score: action.payload ? state.score + 1 : state.score,
                currentQuestionIndex: state.currentQuestionIndex + 1,
            };

        case SKIP_QUESTION:
            return {
                ...state,
                currentQuestionIndex: state.currentQuestionIndex + 1,
            };

        case RESET_QUIZ:
            return initialState;

        default:
            return state;
    }


}
