import axios from "axios";



export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAIL = "LOGOUT_FAIL";



//register action
export const registerUser = (userData) => async (dispatch) => {
    // console.log(userData)
    dispatch({ type: REGISTER_REQUEST });
    try {
        const res = await axios.post("https://reqres.in/api/register",
            userData,
            {
                headers: { "x-api-key": "reqres-free-v1" },
            }
        );
        // console.log("response", res.data)
        localStorage.setItem("token", res.data.token)
        dispatch({ type: REGISTER_SUCCESS, payload: res.data });

    } catch (err) {
        console.log(err)
        dispatch({
            type: REGISTER_FAIL,
            payload: err.response ? err.response.data : { error: err.message },
        });
    }
};

// Login Action
export const loginUser = (userData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const res = await axios.post("https://reqres.in/api/login",
            userData,
            {
                headers: { "x-api-key": "reqres-free-v1" },
            },
        );
        // console.log("response", res.data)
        localStorage.setItem("token", res.data.token)
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    } catch (err) {
        console.log(err)
        dispatch({ type: LOGIN_FAIL, payload: err.response.data });
    }
};

// Logout Action
// authActions.js
export const logoutUser = () => (dispatch) => {

    dispatch({ type: LOGOUT_REQUEST });

    // Remove token from localStorage
    localStorage.removeItem("token");

    // Update Redux state
    dispatch({ type: LOGOUT_SUCCESS });
};






