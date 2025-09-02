import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { decrement, increament, reset } from './features/counter/counterSlice';

const Counter = () => {
    // SUBSCRIBE STORE 
    const count = useSelector(state => state.counter.count)

    const dispatch = useDispatch();



    return (
        <div>
            <h2>Count: {count}</h2>

            <button style={{ marginRight: '10px' }}
                onClick={() => dispatch(increament())}>Increment</button>
            <button
                onClick={() => dispatch(decrement())}
                disabled={count === 0}
                style={{ marginRight: '10px', opacity: count === 0 ? 0.5 : 1, cursor: count === 0 ? "not-allowed" : "pointer" }}
            >
                Decrement
            </button>
            <button onClick={() => dispatch(reset())}>Reset</button>
        </div>
    );
}

export default Counter;
