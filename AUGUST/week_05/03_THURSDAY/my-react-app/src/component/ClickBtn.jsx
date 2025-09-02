import React, { useState } from 'react';

const useClickMiddleware = (callback, delay = 2000) => {
    const [lastClick, setlastClick] = useState(0);

    return () => {
        const now = Date.now()
        if (now - lastClick < delay) {
            console.log("Click blocked by middlewate")
            return;
        }
        setlastClick(now)
        callback()
    }
}

const ClickBtn = () => {

    const handleClick = useClickMiddleware(() => {
        console.log("button clicked");
    })

    return (
        <div>
            <button onClick={handleClick}>Click Me</button>
        </div>
    );
}

export default ClickBtn;
