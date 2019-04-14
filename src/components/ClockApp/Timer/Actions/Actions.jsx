import React from 'react';
import { connect } from 'react-redux';

import {
  Wrapper,
  ResetButton,
  StartStopButton,
  ResetIcon,
  StartStopIcon,
} from './Actions.components';
import { ActionCreators, Selectors } from 'redux/clock/timer';
import { TimerStatuses } from 'constants/timerStatuses';

export function Actions({ status, start, stop, reset }) {
  return (
    <Wrapper>
      <ResetButton disabled={status === TimerStatuses.PENDING} onClick={reset}>
        <ResetIcon />
        Reset
      </ResetButton>
      <StartStopButton
        onClick={status === TimerStatuses.RUNNING ? stop : () => start(120)}
      >
        <StartStopIcon />
        {status === TimerStatuses.RUNNING ? 'Stop' : 'Start'}
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
  },
)(Actions);
