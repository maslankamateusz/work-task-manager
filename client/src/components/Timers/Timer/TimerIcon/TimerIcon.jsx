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
    transform: translate(-50%, -50%);
    transition: transform 0.3s ease-in-out;
  }

  .play-icon {
    margin-left: 3px;
    opacity: ${({ isTimerRunning }) => (isTimerRunning ? '0' : '1')};
    transform: translate(-50%, -50%) scale(${({ isTimerRunning }) => (isTimerRunning ? '0' : '1')});
  }

  .pause-icon {
    opacity: ${({ isTimerRunning }) => (isTimerRunning ? '1' : '0')};
    transform: translate(-50%, -50%) scale(${({ isTimerRunning }) => (isTimerRunning ? '1' : '0')});
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
