import React from 'react';
import Child from './Child';

const Middle = ({ message }) => {
    return (
        <div>
            <h2>Middle Component</h2>
            <Child message={message} />
        </div>
    );
}

export default Middle;
