import { applyMiddleware, createStore } from "redux";
import { thunk } from "redux-thunk";
import coffeeReducer from "./reducer";



const store = createStore(
    coffeeReducer,
    applyMiddleware(thunk));

export default store;
