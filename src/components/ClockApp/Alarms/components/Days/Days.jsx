import React from 'react';

import { Wrapper, Box } from './Days.components';
import Checkbox from '../Checkbox';

const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

export function Days({ selectedDays, changeAlarmDay }) {
  function handleCheckboxChange(event) {
    changeAlarmDay(event.target.name);
  }

  return (
    <Wrapper>
      <h3>Description</h3>
      <Box>
        {DAYS.map(day => (
          <Checkbox
            key={day}
            name={day}
            label={day}
            checked={selectedDays[day]}
            onChange={handleCheckboxChange}
          />
        ))}
      </Box>
    </Wrapper>
  );
}

export default Days;
