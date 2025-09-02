import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import userReducer from '../features/users/userSlice';
import logger from 'redux-logger'


export const store = configureStore({
    reducer: {
        counter: counterReducer,
        users: userReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})
