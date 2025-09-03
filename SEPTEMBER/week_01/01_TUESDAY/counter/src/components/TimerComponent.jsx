import React from 'react';
import { useTimer } from '../useTimer';

const TimerComponent = () => {

      const { timer, isRunning, startTimer, stopTimer, resetTimer } = useTimer();


    return (
        <div>
            <h2>Timer: {timer}s</h2>
            <p>{isRunning ? "Running..." : "Stopped"}</p>
            <button onClick={startTimer}>Start</button>
            <button onClick={stopTimer}>Stop</button>
            <button onClick={resetTimer}>Reset</button>
        </div>
    );
}

export default TimerComponent;
