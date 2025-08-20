import React from 'react';

const Child = ({message}) => {
    return (
        <div>
            <h3>Child Component</h3>
            <p>{message}</p>
        </div>
    );
}

export default Child;
