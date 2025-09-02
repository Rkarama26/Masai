import { logger } from "redux-logger";


const delayMiddleware = (store) => (next) => (action) => {
    if (action.type === "ASYNC_INCREMENT") {
        //not a async operation 
        setTimeout(() => {
            store.dispatch({ type: "INCREMENT" });
        }, 2000);
    } else {
        next(action);
    }
};

export  {delayMiddleware, logger};
