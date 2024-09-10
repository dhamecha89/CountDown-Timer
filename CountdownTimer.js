import React, { useState, useEffect } from 'react';
import './CountdownTimer.css';

function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState(60);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let timer;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsRunning(false);
            alert("Time is up!");
        }
        return () => clearInterval(timer);
    }, [isRunning, timeLeft]);

    const handleRangeChange = (event) => {
        setTimeLeft(event.target.value * 60);
    };

    const startCountdown = () => {
        if (timeLeft > 0) {
            setIsRunning(true);
        }
    };

    const stopCountdown = () => {
        setIsRunning(false);
    };

    const resetCountdown = () => {
        setIsRunning(false);
        setTimeLeft(60);
    };

    const formatTime = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="container">
            <div className="time-display">
                <span id="time">{formatTime()}</span>
            </div>
            <input
                type="range"
                id="timeRange"
                min="1"
                max="60"
                value={Math.ceil(timeLeft / 60)}
                onChange={handleRangeChange}
                disabled={isRunning}
            />
            <div className="buttons">
                <button onClick={startCountdown} disabled={isRunning}>Start</button>
                <button onClick={stopCountdown} disabled={!isRunning}>Stop</button>
                <button onClick={resetCountdown}>Reset</button>
            </div>
        </div>
    );
}

export default CountdownTimer;
