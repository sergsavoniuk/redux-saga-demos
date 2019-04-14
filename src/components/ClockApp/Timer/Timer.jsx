import React, { useState } from 'react';

import TimeField from './TimeField';
import Actions from './Actions';
import { Wrapper } from './Timer.components';

function Timer() {
  const [time, setTime] = useState('00:00:00');

  function handleTimeFieldChange(value) {
    setTime('01:00:00');
  }

  return (
    <Wrapper>
      <TimeField initialValue={time} onChange={handleTimeFieldChange} />
      <Actions />
    </Wrapper>
  );
}

export default Timer;
