import React, { memo } from 'react';

import Checkbox from '../Checkbox';
import { Wrapper } from './SetAlarmButton.components';

function SetAlarmButton({ setAlarm, checked }) {
  function handleCheckboxChange(event) {
    setAlarm(event.target.checked);
  }

  return (
    <Wrapper>
      <label>
        <Checkbox checked={checked} onChange={handleCheckboxChange} />
      </label>
    </Wrapper>
  );
}

export default memo(SetAlarmButton);
