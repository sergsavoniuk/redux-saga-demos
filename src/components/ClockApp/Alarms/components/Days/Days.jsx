import React from 'react';

import { Wrapper, Box } from './Days.components';
import Checkbox from '../Checkbox';

const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

export function Days({ active, selectedDays, changeAlarmDay }) {
  function handleCheckboxChange(event) {
    changeAlarmDay(DAYS.indexOf(event.target.name) + 1);
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
            checked={selectedDays.includes(index + 1)}
            onChange={handleCheckboxChange}
          />
        ))}
      </Box>
    </Wrapper>
  );
}

export default Days;
