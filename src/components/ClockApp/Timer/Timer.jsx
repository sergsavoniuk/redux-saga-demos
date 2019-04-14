import React, { useState } from 'react';
import { connect } from 'react-redux';
import { format, addSeconds, subSeconds } from 'date-fns';

import TimeField from './TimeField';
import Actions from './Actions';
import { Wrapper, RemainedTime } from './Timer.components';
import { Selectors } from 'redux/clock/timer';

function secsToTime(timeInSecs) {
  return addSeconds(new Date('01 Jan 1970 00:00:00'), timeInSecs);
}

export function Timer({ startTime, remainedTime }) {
  const [time, setTime] = useState('00:00:00');

  function handleTimeFieldChange(value) {
    setTime('01:00:00');
  }

  return (
    <Wrapper>
      <TimeField initialValue={time} onChange={handleTimeFieldChange} />
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
