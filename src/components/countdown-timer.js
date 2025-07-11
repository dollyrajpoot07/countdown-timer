'use client';
import React, { useState, useEffect, useRef } from 'react';
import styles from './countdown-timer.module.css';

export default function CountdownTimer() {
    const [time, setTime] = useState(0); // in seconds
    const [inputMin, setInputMin] = useState('');
    const [inputSec, setInputSec] = useState('');
    const [isActive, setIsActive] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (isActive && time > 0) {
            intervalRef.current = setInterval(() => {
                setTime((prev) => prev - 1);
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [isActive, time]);

    const formatTime = (secs) => {
        const hrs = String(Math.floor(secs / 3600)).padStart(2, '0');
        const mins = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
        const secsLeft = String(secs % 60).padStart(2, '0');
        return `${hrs}:${mins}:${secsLeft}`;
    };

    const startTimer = () => {
        const total = parseInt(inputMin || 0) * 60 + parseInt(inputSec || 0);
        if (total > 0) {
            setTime(total);
            setIsActive(true);
        }
    };

    const resetTimer = () => {
        setIsActive(false);
        setTime(0);
        setInputMin('');
        setInputSec('');
    };

    return (
        <div className={styles.container}>
            <h2>⏳ Countdown Timer</h2>
            <div className={styles.inputGroup}>
                <input
                    type="number"
                    placeholder="Min"
                    value={inputMin}
                    onChange={(e) => setInputMin(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Sec"
                    value={inputSec}
                    onChange={(e) => setInputSec(e.target.value)}
                />
            </div>

            <div className={styles.timerDisplay}>
                {time > 0 ? formatTime(time) : isActive ? "⏰ Time's up!" : '00:00:00'}
            </div>

            <div className={styles.buttons}>
                <button onClick={startTimer} disabled={isActive}>Start</button>
                <button onClick={() => setIsActive(false)}>Pause</button>
                <button onClick={resetTimer}>Reset</button>
            </div>
        </div>
    );
}
