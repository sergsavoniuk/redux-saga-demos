import React, { useState } from 'react';
import { connect } from 'react-redux';
import { format, addSeconds, subSeconds } from 'date-fns';

import TimeField from './TimeField';
import Actions from './Actions';
import { Wrapper, Box, Separator, RemainedTime } from './Timer.components';
import { Selectors } from 'redux/clock/timer';

function secsToTime(timeInSecs) {
  return addSeconds(new Date('01 Jan 1970 00:00:00'), timeInSecs);
}

export function Timer({ startTime, remainedTime }) {
  const [hours, setHours] = useState('13');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');

  return (
    <Wrapper>
      <Box>
        <TimeField name="Hours" value={hours} onChange={setHours} />
        <Separator>:</Separator>
        <TimeField name="Mins." value={minutes} onChange={setMinutes} />
        <Separator>:</Separator>
        <TimeField name="Secs." value={seconds} onChange={setSeconds} />
      </Box>
      {remainedTime && (
        <RemainedTime>
          {format(subSeconds(secsToTime(remainedTime), 1), 'HH:mm:ss')}
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

export default connect(mapStateToProps)(Timer);
