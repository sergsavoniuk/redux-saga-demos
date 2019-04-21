import React, { memo } from 'react';
import { bool, func } from 'prop-types';

import Checkbox from '../Checkbox';
import { Wrapper } from './SetAlarmButton.components';

function SetAlarmButton({ setAlarm, checked = false }) {
  function handleCheckboxChange(event) {
    setAlarm(event.target.checked);
  }

  return (
    <Wrapper>
      <label>
        <Checkbox
          name="set-alarm"
          checked={checked}
          onChange={handleCheckboxChange}
        />
      </label>
    </Wrapper>
  );
}

SetAlarmButton.propTypes = {
  checked: bool,
  setAlarm: func.isRequired,
};

export default memo(SetAlarmButton);
