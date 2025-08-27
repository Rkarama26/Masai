import React from 'react';
import { useReducer } from 'react';



function reducer(state, action) {
    switch (action.type) {
        case 'increament':
            return { count: state.count + 1 }
        case 'decrement':
            return { count: state.count - 1 }
        default:
            return state;
    }
}


const Counter = () => {

    const [state, dispath] = useReducer(reducer, { count: 0 })

    return (
        <>
            <h1> Counter using useReducer</h1>
            <p>Count: {state.count}</p>

            <button onClick={() => dispath({ type: 'increament' })}>Increase Count</button>
            <button onClick={() => dispath({ type: 'decrement' })} >Decrease Count</button>
        </>
    );
}

export default Counter;
