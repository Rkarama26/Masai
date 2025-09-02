import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
} from "../actions/authActions";



const initialState = {
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case LOGOUT_REQUEST:
            return { ...state, loading: true, error: null }


        case REGISTER_SUCCESS:
            return {
                ...state, loading: false, user: { id: action.payload.id },
                token: action.payload.token
            };
 
        case LOGIN_SUCCESS:
            return { ...state, loading: false, token: action.payload.token };

        case LOGOUT_SUCCESS:
            return { ...state, loading: false, token: null, user: null };

        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT_FAIL:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
}