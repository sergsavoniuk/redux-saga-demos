import React, { useEffect, useReducer } from 'react';
import { number, string, func } from 'prop-types';
import { connect } from 'react-redux';

import Actions from './components/Actions';
import RemainedTime from './components/RemainedTime';
import TimeField from 'components/ClockApp/TimeField';
import { Wrapper, Box, Separator } from './Timer.components';
import { ActionCreators, Selectors } from 'redux/clock/timer';
import { TimerStatuses } from 'constants/clock/timerStatuses';
import { init, reducer } from 'components/ClockApp/TimeField/utils';

const { PENDING, FINISHED } = TimerStatuses;

export function Timer({ status, startTime, remainedTime, setStartTime }) {
  const [{ hours, minutes, seconds }, dispatch] = useReducer(
    reducer,
    { startTime },
    init,
  );

  useEffect(() => {
    setStartTime(
      `${hours}:${minutes}:${seconds}`
        .split(':')
        .reduce((acc, time) => 60 * acc + +time),
    );
  }, [hours, minutes, seconds]);

  return (
    <Wrapper>
      <Box>
        <TimeField
          name="hours"
          label="Hours"
          disabled={status !== PENDING}
          value={hours}
          onChange={dispatch}
        />
        <Separator>:</Separator>
        <TimeField
          name="minutes"
          label="Mins."
          disabled={status !== PENDING}
          value={minutes}
          onChange={dispatch}
        />
        <Separator>:</Separator>
        <TimeField
          name="seconds"
          label="Secs."
          disabled={status !== PENDING}
          value={seconds}
          onChange={dispatch}
        />
      </Box>
      {status !== PENDING && status !== FINISHED && (
        <RemainedTime remainedTime={remainedTime} />
      )}
      <Actions />
    </Wrapper>
  );
}

Timer.propTypes = {
  status: string.isRequired,
  startTime: number.isRequired,
  remainedTime: number.isRequired,
  setStartTime: func.isRequired,
};

function mapStateToProps(state) {
  return {
    status: Selectors.getStatus(state),
    startTime: Selectors.getStartTime(state),
    remainedTime: Selectors.getRemainedTime(state),
  };
}

export default connect(
  mapStateToProps,
  { setStartTime: ActionCreators.setStartTime },
)(Timer);
