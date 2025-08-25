import React from 'react';
import { useReducer } from 'react';



function reducer(state, action){
     switch(action.type){
        case 'increament':
            return {count: state.count+1}
     }
}


const Counter = () => {

    const [state, dispath] = useReducer(reducer, {count:0})
    return (
        <>
            <h1> Counter using useReducer</h1>
             
        </>
    );
}

export default Counter;
