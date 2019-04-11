import React from 'react';

import Actions from './Actions';
import LapsHistory from './LapsHistory';
import { Wrapper, Total, Lap, Label, Value } from './StopWatch.components';

function StopWatch() {
  return (
    <Wrapper>
      <Total>
        <Label>Total</Label>
        <Value>00:00.0</Value>
      </Total>
      <Lap>
        <Label>Lap</Label>
        <Value>00:00.0</Value>
      </Lap>
      <LapsHistory />
      <Actions />
    </Wrapper>
  );
}

export default StopWatch;
