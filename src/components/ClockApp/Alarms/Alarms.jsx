import React from 'react';

import Alarm from './components/Alarm';
import { Wrapper } from './Alarms.components';

function Alarms() {
  return (
    <Wrapper>
      <Alarm />
      <Alarm />
      <Alarm />
      <Alarm />
    </Wrapper>
  );
}

export default Alarms;
