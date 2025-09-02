import { createStore, applyMiddleware } from 'redux'
import counterReducer from './reduce';
import { delayMiddleware, logger } from '../middleware';

//custom middleware
/*
const loggerMiddleware = (store) => (next) => (action) => {
    console.log('Middleware Dispatching:', action);
    return next(action);
};
*/


const store = createStore(
    counterReducer,
    applyMiddleware(delayMiddleware, logger));
 
export default store;
