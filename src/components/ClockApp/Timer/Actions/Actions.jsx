import React from 'react';
import { connect } from 'react-redux';

import {
  Wrapper,
  ResetButton,
  StartStopButton,
  ResetIcon,
  StartStopIcon,
} from './Actions.components';
import { ActionCreators, Selectors } from 'redux/clock/stopwatch';
import { StopwatchStatuses } from 'constants/stopwatchStatuses';

export function Actions() {
  return (
    <Wrapper>
      <ResetButton
      // disabled={status === StopwatchStatuses.PENDING}
      // onClick={reset}
      >
        <ResetIcon />
        Reset
      </ResetButton>
      <StartStopButton
      // onClick={status === StopwatchStatuses.RUNNING ? stop : start}
      >
        <StartStopIcon />
        Start
        {/* {status === StopwatchStatuses.RUNNING ? 'Stop' : 'Start'} */}
      </StartStopButton>
    </Wrapper>
  );
}

function mapStateToProps(state) {
  return {
    status: Selectors.getStatus(state),
  };
}

export default connect()(Actions);
// mapStateToProps,
// {
//   start: ActionCreators.start,
//   stop: ActionCreators.stop,
//   reset: ActionCreators.reset,
//   setLapTime: ActionCreators.setLapTime,
// },
