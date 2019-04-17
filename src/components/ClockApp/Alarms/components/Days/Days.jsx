import React from 'react';

import { Wrapper, Box } from './Days.components';
import Checkbox from '../Checkbox';

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export function Days({ active, selectedDays, changeAlarmDay }) {
  function handleCheckboxChange(event) {
    changeAlarmDay(DAYS.indexOf(event.target.name));
  }

  return (
    <Wrapper>
      <h3>Description</h3>
      <Box>
        {DAYS.map((day, index) => (
          <Checkbox
            key={day}
            name={day}
            label={day}
            disabled={active}
            checked={selectedDays.includes(index)}
            onChange={handleCheckboxChange}
          />
        ))}
      </Box>
    </Wrapper>
  );
}

export default Days;
