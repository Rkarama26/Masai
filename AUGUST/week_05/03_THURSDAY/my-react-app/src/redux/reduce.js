const initialValue = { count: 0}

const counterReducer = (state = initialValue, action) => {
    switch (action.type) {
        case "INCREMENT":
            return { count: state.count + 1 };
        case "DECREMENT":
            return { count: state.count - 1 };
        case "ASYNC_INCREMENT":
            return { count: state.count + 1 };
        default:
            return state;
    }
};
  
export default counterReducer;
