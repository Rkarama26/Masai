import React from 'react';

const ButtonTwo = ({setCount}) => {
    return (
        <div>
            <button onClick={() => setCount(prevCount => prevCount - 1)} >Decrement</button>
        </div>
    );
}

export default ButtonTwo;
