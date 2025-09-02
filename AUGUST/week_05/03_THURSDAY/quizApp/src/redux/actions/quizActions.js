
import axios from "axios";


export const FETCH_QUIZ_REQUEST = "FETCH_QUIZ_REQUEST";
export const FETCH_QUIZ_SUCCESS = "FETCH_QUIZ_SUCCESS";
export const FETCH_QUIZ_FAIL = "FETCH_QUIZ_FAIL";
export const SUBMIT_ANSWER = "SUBMIT_ANSWER";
export const SKIP_QUESTION = "SKIP_QUESTION";
export const RESET_QUIZ = "RESET_QUIZ";


export const fetchQuiz = () => async (dispatch) => {
    dispatch({ type: FETCH_QUIZ_REQUEST });
    try {
        const res = await axios.get(
            "https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-quiz"
        );
        console.log(res)
        dispatch({ type: FETCH_QUIZ_SUCCESS, payload: res.data.data });
    } catch (err) {
        dispatch({
            type: FETCH_QUIZ_FAIL,
            payload: err.response ? err.response.data : { error: err.message },
        });
    }
};


export const submitAnswer = (isCorrect) => (dispatch) => {
    dispatch({ type: SUBMIT_ANSWER, payload: isCorrect });
};

export const skipQuestion = () => (dispatch) => {
    dispatch({ type: SKIP_QUESTION });
};

export const resetQuiz = () => (dispatch) => {
    dispatch({ type: RESET_QUIZ });
};