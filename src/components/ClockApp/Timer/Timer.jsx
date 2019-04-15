import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { format, addSeconds, subSeconds } from 'date-fns';

import TimeField from './TimeField';
import Actions from './Actions';
import { Wrapper, Box, Separator, RemainedTime } from './Timer.components';
import { ActionCreators, Selectors } from 'redux/clock/timer';

function secsToTime(timeInSecs) {
  return addSeconds(new Date('01 Jan 1970 00:00:00'), timeInSecs + 1);
}

export function Timer({ startTime, remainedTime, setStartTime }) {
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');

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
        <TimeField name="Hours" value={hours} onChange={setHours} />
        <Separator>:</Separator>
        <TimeField name="Mins." value={minutes} onChange={setMinutes} />
        <Separator>:</Separator>
        <TimeField name="Secs." value={seconds} onChange={setSeconds} />
      </Box>
      {remainedTime !== null && (
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
    startTime: Selectors.getStartTime(state),
    remainedTime: Selectors.getRemainedTime(state),
  };
}

export default connect(
  mapStateToProps,
  { setStartTime: ActionCreators.setStartTime },
)(Timer);
