import React, { useState, useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import { format, subSeconds } from 'date-fns';

import Actions from './components/Actions';
import TimeField from 'components/ClockApp/TimeField';
import Notification from 'components/ClockApp/Notification';
import { Wrapper, Box, Separator, RemainedTime } from './Timer.components';
import { ActionCreators, Selectors } from 'redux/clock/timer';
import { TimerStatuses } from 'constants/clock/timerStatuses';
import { secsToTime, init, reducer } from 'components/ClockApp/TimeField/utils';

export function Timer({
  status,
  startTime,
  remainedTime,
  setStartTime,
  reset,
}) {
  const [showNotification, setShowNotification] = useState(false);

  const [{ hours, minutes, seconds }, dispatch] = useReducer(
    reducer,
    startTime,
    init,
  );

  useEffect(() => {
    setStartTime(
      `${hours}:${minutes}:${seconds}`
        .split(':')
        .reduce((acc, time) => 60 * acc + +time),
    );
  }, [hours, minutes, seconds]);

  useEffect(() => {
    setShowNotification(status === TimerStatuses.FINISHED);
  }, [status]);

  function handleCloseNotification() {
    reset();
    setShowNotification(false);
  }

  return (
    <Wrapper>
      <Box>
        <TimeField
          name="hours"
          label="Hours"
          disabled={status !== TimerStatuses.PENDING}
          value={hours}
          onChange={dispatch}
        />
        <Separator>:</Separator>
        <TimeField
          name="minutes"
          label="Mins."
          disabled={status !== TimerStatuses.PENDING}
          value={minutes}
          onChange={dispatch}
        />
        <Separator>:</Separator>
        <TimeField
          name="seconds"
          label="Secs."
          disabled={status !== TimerStatuses.PENDING}
          value={seconds}
          onChange={dispatch}
        />
      </Box>
      <Notification
        title="Timer"
        body="The time is up!"
        visible={showNotification}
        onClose={handleCloseNotification}
      />
      {status !== TimerStatuses.PENDING && (
        <RemainedTime>
          {remainedTime > 0
            ? format(subSeconds(secsToTime(remainedTime), 1), 'HH:mm:ss')
            : '00:00:00'}
        </RemainedTime>
      )}
      <Actions />
    </Wrapper>
  );
}

function mapStateToProps(state) {
  return {
    status: Selectors.getStatus(state),
    startTime: Selectors.getStartTime(state),
    remainedTime: Selectors.getRemainedTime(state),
  };
}

export default connect(
  mapStateToProps,
  { setStartTime: ActionCreators.setStartTime, reset: ActionCreators.reset },
)(Timer);
