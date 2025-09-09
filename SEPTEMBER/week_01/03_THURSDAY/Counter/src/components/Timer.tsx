
import React, { useState, useEffect } from 'react';

// Define interface for the Timer state
interface TimerState {
  time: number;
  isRunning: boolean;
}

const Timer: React.FC = () => {
  const [timer, setTimer] = useState<TimerState>({
    time: 0,
    isRunning: false,
  });

 useEffect(() => {
  let interval: number;

  if (timer.isRunning) {
    interval = window.setInterval(() => {
      setTimer((prevTimer) => ({
        ...prevTimer,
        time: prevTimer.time + 1,
      }));
    }, 1000);
  }

  return () => {
    clearInterval(interval);
  };
}, [timer.isRunning]);

  const handleStart = () => {
    setTimer((prevTimer) => ({
      ...prevTimer,
      isRunning: true,
    }));
  };

  const handleStop = () => {
    setTimer((prevTimer) => ({
      ...prevTimer,
      isRunning: false,
    }));
  };

  const handleReset = () => {
    setTimer({
      time: 0,
      isRunning: false,
    });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Timer: {timer.time} seconds</h1>
      <button onClick={handleStart} disabled={timer.isRunning} style={{ marginRight: '10px' }}>
        Start
      </button>
      <button onClick={handleStop} disabled={!timer.isRunning} style={{ marginRight: '10px' }}>
        Stop
      </button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Timer;
