import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from './redux/actions/counterActions';

const Counter = () => {

    const count = useSelector((state) => state.counter.count)
    const dispatch = useDispatch()
    return (
        <div>
            <h2>Counter :{count}</h2>
            <button onClick={() => dispatch(increment())}>INCREAMENT</button>
            <button onClick={() => dispatch(decrement())}>DECREMENT</button>
        </div>
    );
}

export default Counter;
