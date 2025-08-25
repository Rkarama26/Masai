import React, { useEffect, useRef, useState } from 'react';

const RenderCount = () => {

    const [count, setcount] = useState(0);
    const renderCount = useRef(1); // Track component render count
    const prevCount = useRef(0); // store previous count

    useEffect(() => {
        renderCount.current += 1;
        prevCount.current = count;
    });

    return (
        <div>
            <h2>Counter: {count}</h2>
            <p>Previous Count: {prevCount.current} </p>
            <button onClick={() => setcount(prev => prev + 1)}>Increase Count</button>
            <p>Component Re-rendered: {renderCount.current} Times</p>
        </div>
    );
}

export default RenderCount;
