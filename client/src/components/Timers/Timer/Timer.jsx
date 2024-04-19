import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Circle = styled.circle`
  stroke-dasharray: 283;
  stroke-dashoffset: ${({ dashOffset }) => dashOffset};
  transition: stroke-dashoffset 1s linear;
  stroke: #007bff;
  stroke-width: 5;
  fill: none;
  stroke-linecap: round;
`;

const CircleBorder = styled.circle`
  stroke-dasharray: 330;
  stroke-dashoffset: ${({ dashOffset }) => dashOffset};
  transition: stroke-dashoffset 1s linear;
  stroke: black;
  stroke-width: 1;
  fill: none;
`;

export default function Timer() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [dashOffset, setDashOffset] = useState(283);
  const intervalRef = useRef(null);
  const lastDashOffset = useRef(null);

  const fullRotationTime = 3600;

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
    lastDashOffset.current = dashOffset;
  };

  const resetTimer = () => {
    setElapsedTime(0);
    setDashOffset(283);
    lastDashOffset.current = 283;
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  useEffect(() => {
    if (isRunning) {
      const newDashOffset = ((elapsedTime % fullRotationTime) / fullRotationTime) * 283;
      setDashOffset((283 - newDashOffset).toFixed(2));
    }
  }, [elapsedTime, isRunning]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div style={{ position: 'relative', width: '10vw', height: '15vh' }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100">
        <Circle
          cx="50"
          cy="50"
          r="45"
          dashOffset={isRunning ? dashOffset : (lastDashOffset.current || 283)}
        />
        <CircleBorder cx="50" cy="50" r="42" />
        <CircleBorder cx="50" cy="50" r="48" />
      </svg>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '24px',
        }}
      >
        {formatTime(elapsedTime)}
      </div>
      <div style={{ marginTop: '20px' }}>
        <button onClick={startTimer}>Start</button>
        <button onClick={pauseTimer}>Pause</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}
