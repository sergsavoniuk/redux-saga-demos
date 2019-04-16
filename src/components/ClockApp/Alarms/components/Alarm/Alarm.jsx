import React from 'react';

import TimeField, { Separator, Box } from 'components/ClockApp/TimeField';
import Days from '../Days';
import SetAlarmButton from '../SetAlarmButton';
import { Wrapper } from './Alarm.components';

function Alarm() {
  return (
    <Wrapper>
      <Box>
        <TimeField
          name="hours"
          label="Hours"
          disabled={false}
          value={'00'}
          onChange={() => {}}
        />
        <Separator>:</Separator>
        <TimeField
          name="minutes"
          label="Mins."
          disabled={false}
          value={'00'}
          onChange={() => {}}
        />
      </Box>
      <Days />
      <SetAlarmButton />
    </Wrapper>
  );
}

export default Alarm;
