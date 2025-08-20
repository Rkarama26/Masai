import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const TimerComponent = () => {

    const [seconds, setseconds] = useState(0);

    useEffect(() => {
        console.log("Timer Started")

        const timer = setInterval(() => {
            setseconds(prev => prev + 1);
            console.log(`seconds ${seconds}s`)
        }, 1000)

        return (
            () => {

                clearInterval(timer)
                console.log("Timer stopped")
            }

        )
    }, [])

    return (
        <>
            <h1>Time: {seconds}s</h1>
        </>
    );
}

export default TimerComponent;
