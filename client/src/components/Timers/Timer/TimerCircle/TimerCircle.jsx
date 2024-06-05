import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
`;

const Circle = styled.circle`
  fill: none;
  stroke: #000;
  stroke-width: 4;
  stroke-dasharray: 283;
  transition: stroke-dashoffset 0.3s ease-in-out;
`;

export default function TimerCircle({ isRunning, dashOffset }) {
  return (
    <svg width="100" height="100">
      <Circle
        cx="50"
        cy="50"
        r="45"
        dashOffset={isRunning ? dashOffset : (dashOffset || 283)}
      />
      <IconWrapper>
        <FontAwesomeIcon icon={faPlay} style={{ opacity: isRunning ? 0 : 1 }} size="3x" />
        <FontAwesomeIcon icon={faPause} style={{ opacity: isRunning ? 1 : 0 }} size="3x" />
      </IconWrapper>
    </svg>
  );
}
