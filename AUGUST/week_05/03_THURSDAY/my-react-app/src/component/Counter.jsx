import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncIncrement, decrement, increment, } from '../redux/action';

const Counter = () => {

    const count = useSelector((state) => state.count);
    const dispatch = useDispatch();

    return (
        <div>
            <h1>Counter: {count}</h1>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
            <button onClick={() => dispatch(asyncIncrement())}>Increment After 2 sec</button>
        </div>
    );
}

export default Counter;
