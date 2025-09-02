import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./redux/reducers/authReducers";
import { quizReducer } from "./redux/reducers/quizReducer";


const rootReducer = combineReducers({
    auth: authReducer,
    quiz: quizReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;