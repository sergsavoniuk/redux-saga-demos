import React from 'react';
import { connect } from 'react-redux';

import {
  Wrapper,
  ResetButton,
  LapButton,
  StartStopButton,
  ResetIcon,
  LapIcon,
  StartStopIcon,
} from './Actions.components';

export function Actions() {
  return (
    <Wrapper>
      <ResetButton onClick={() => {}}>
        <ResetIcon />
        Reset
      </ResetButton>
      <LapButton onClick={() => {}}>
        <LapIcon />
        Lap
      </LapButton>
      <StartStopButton onClick={() => {}}>
        <StartStopIcon />
        Start
      </StartStopButton>
    </Wrapper>
  );
}

export default connect(
  null,
  {},
)(Actions);
