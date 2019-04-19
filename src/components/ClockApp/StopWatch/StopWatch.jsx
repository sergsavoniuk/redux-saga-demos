import React from 'react';
import { connect } from 'react-redux';
import { format, addSeconds } from 'date-fns';

import DisplayTime from './DisplayTime';
import Actions from './Actions';
import LapsHistory from './LapsHistory';
import { Total, Lap, Label, Value } from './StopWatch.components';
import { ActionCreators, Selectors } from 'redux/clock/stopwatch';

function StopWatch({ totalTime, start, lapTime }) {
  return (
    <>
      <DisplayTime label="Total" value={totalTime} />
      <DisplayTime label="Lap" value={lapTime} />
      {/* <Total>
        <Label>Total</Label>
        <Value>{format(addSeconds(new Date(0), totalTime), 'mm:ss')}</Value>
      </Total>
      <Lap>
        <Label>Lap</Label>
        <Value>{format(addSeconds(new Date(0), lapTime), 'mm:ss')}</Value>
      </Lap> */}
      <LapsHistory />
      <Actions />
    </>
  );
}

function mapStateToProps(state) {
  return {
    totalTime: Selectors.getTotalTime(state),
    lapTime: Selectors.getLapTime(state),
  };
}

export default connect(
  mapStateToProps,
  { start: ActionCreators.start },
)(StopWatch);
