import { todoReducer } from "./reducer";
import { createStore } from 'redux'


const store = createStore(todoReducer);

export default store;