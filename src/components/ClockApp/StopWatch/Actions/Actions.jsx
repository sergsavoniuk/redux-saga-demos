import React from 'react';
import { connect } from 'react-redux';

import {
  Wrapper,
  ResetButton,
  LapButton,
  StartStopButton,
  ResetIcon,
  LapIcon,
  StartStopIcon,
} from './Actions.components';
import {
  start,
  stop,
  reset,
  setLapTime,
  getStatus,
} from 'redux/clock/stopwatch';

export function Actions({ running, start, stop, setLapTime, reset }) {
  return (
    <Wrapper>
      <ResetButton onClick={reset}>
        <ResetIcon />
        Reset
      </ResetButton>
      <LapButton onClick={setLapTime}>
        <LapIcon />
        Lap
      </LapButton>
      <StartStopButton onClick={running ? stop : start}>
        <StartStopIcon />
        {running ? 'Stop' : 'Start'}
      </StartStopButton>
    </Wrapper>
  );
}

function mapStateToProps(state) {
  return {
    running: getStatus(state),
  };
}

export default connect(
  mapStateToProps,
  { start, stop, reset, setLapTime },
)(Actions);
