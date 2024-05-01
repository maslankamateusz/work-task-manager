import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import TimerIcon from './TimerIcon/TimerIcon.jsx';
import TimerDescription from './TimerDescription/TimerDescription.jsx';

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

export default function Timer({ title }) {
  const [timerState, setTimerState] = useState({
    elapsedTime: 0,
    isRunning: false,
    dashOffset: 283,
    fullRotationTime: 3600 
  });
  const lastDashOffset = useRef(null);
  const startTime = useRef(null);
  const animationFrame = useRef(null);

  const startTimer = () => {
    setTimerState(prevState => ({
      ...prevState,
      isRunning: true
    }));
    startTime.current = Date.now() - (timerState.elapsedTime * 1000);
    animationFrame.current = requestAnimationFrame(updateTime);
  };

  const pauseTimer = () => {
    setTimerState(prevState => ({
      ...prevState,
      isRunning: false
    }));
    lastDashOffset.current = timerState.dashOffset;
    cancelAnimationFrame(animationFrame.current);
  };

  const resetTimer = () => {
    setTimerState({
      elapsedTime: 0,
      isRunning: false,
      dashOffset: 283,
      fullRotationTime: timerState.fullRotationTime
    });
    lastDashOffset.current = 283;
  };

  const updateTime = () => {
    const currentTime = Date.now();
    const newElapsedTime = Math.floor((currentTime - startTime.current) / 1000);
    setTimerState(prevState => ({
      ...prevState,
      elapsedTime: newElapsedTime
    }));

    const newDashOffset = 283 - ((newElapsedTime % timerState.fullRotationTime) / timerState.fullRotationTime) * 283; 
    setTimerState(prevState => ({
      ...prevState,
      dashOffset: newDashOffset.toFixed(2)
    }));

    animationFrame.current = requestAnimationFrame(updateTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleAddTime = (time) => {
    const newElapsedTime = timerState.elapsedTime + (time * 60);
    setTimerState(prevState => ({
      ...prevState,
      elapsedTime: newElapsedTime
    }));
  
    const newDashOffset = 283 - ((newElapsedTime % timerState.fullRotationTime) / timerState.fullRotationTime) * 283;
    setTimerState(prevState => ({
      ...prevState,
      dashOffset: newDashOffset.toFixed(2)
    }));
    lastDashOffset.current = newDashOffset;
  };

  return (
    <div className='p-1 relative w-full h-full flex justify-around'>
      <div className='w-1/3'>
          <TimerDescription title={title} addTime={handleAddTime}/>
      </div>
      <div className='w-2/3 flex flex-col items-center justify-center'>
        <div className='w-[70%] h-[70%] relative'>
          <svg width="100%" height="100%" viewBox="0 0 100 100" className='mb-2'>
            <Circle
              cx="50"
              cy="50"
              r="45"
              dashOffset={timerState.isRunning ? timerState.dashOffset : (lastDashOffset.current || 283)}
            />
            <CircleBorder cx="50" cy="50" r="42" />
            <CircleBorder cx="50" cy="50" r="48" />
          </svg>
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center'>
            <TimerIcon startTimer={startTimer} pauseTimer={pauseTimer} />
          </div>
        </div>
        <div className="flex justify-center mt-2">
          {formatTime(timerState.elapsedTime)}
        </div>
      </div>
    </div>
  );
}
