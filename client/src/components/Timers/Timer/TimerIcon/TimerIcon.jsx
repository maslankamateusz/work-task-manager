import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const IconWrapper = styled.div`
  background-color: white;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    background-color: #f0f0f0;
  }

  .play-icon,
  .pause-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(${({ isTimerRunning }) => (isTimerRunning ? '0' : '1')});
    opacity: ${({ isTimerRunning }) => (isTimerRunning ? '0' : '1')};
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  }
  .play-icon{
    margin-left: 5px;
  }

  .pause-icon {
    transform: translate(-50%, -50%) scale(${({ isTimerRunning }) => (isTimerRunning ? '1' : '0')});
    opacity: ${({ isTimerRunning }) => (isTimerRunning ? '1' : '0')};
  }
`;

export default function TimerIcon({ startTimer, pauseTimer }) {
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const togglePlay = () => {
    if (!isTimerRunning) {
      startTimer();
    } else {
      pauseTimer();
    }
    setIsTimerRunning((prevState) => !prevState);
  };

  return (
    <IconWrapper isTimerRunning={isTimerRunning} onClick={togglePlay}>
      <FontAwesomeIcon icon={faPlay} className="play-icon" size="3x" />
      <FontAwesomeIcon icon={faPause} className="pause-icon" size="3x" />
    </IconWrapper>
  );
}
