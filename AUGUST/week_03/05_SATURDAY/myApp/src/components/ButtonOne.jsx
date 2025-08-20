import React from 'react';

const ButtonOne = ({ setCount }) => {
    return (
        <div>
            <button onClick={() => setCount(prevCount => prevCount + 1)}>Increament</button>
        </div>
    );
}

export default ButtonOne;
