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
import { ActionCreators, Selectors } from 'redux/clock/stopwatch';
import { StopwatchStatuses } from 'constants/stopwatchStatuses';

export function Actions({ status, start, stop, reset, setLapTime }) {
  return (
    <Wrapper>
      <ResetButton
        disabled={status === StopwatchStatuses.PENDING}
        onClick={reset}
      >
        <ResetIcon />
        Reset
      </ResetButton>
      <LapButton
        disabled={status !== StopwatchStatuses.RUNNING}
        onClick={setLapTime}
      >
        <LapIcon />
        Lap
      </LapButton>
      <StartStopButton
        onClick={status === StopwatchStatuses.RUNNING ? stop : start}
      >
        <StartStopIcon />
        {status === StopwatchStatuses.RUNNING ? 'Stop' : 'Start'}
      </StartStopButton>
    </Wrapper>
  );
}

function mapStateToProps(state) {
  return {
    status: Selectors.getStatus(state),
  };
}

export default connect(
  mapStateToProps,
  {
    start: ActionCreators.start,
    stop: ActionCreators.stop,
    reset: ActionCreators.reset,
    setLapTime: ActionCreators.setLapTime,
  },
)(Actions);
