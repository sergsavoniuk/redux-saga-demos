import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { format, addSeconds } from 'date-fns';

import Actions from './Actions';
import LapsHistory from './LapsHistory';
import { Total, Lap, Label, Value } from './StopWatch.components';
import { ActionCreators, Selectors } from 'redux/clock/stopwatch';

function StopWatch({ totalTime, start, lapTime }) {
  const [total, setTotal] = useState(null);
  const [lap, setLap] = useState(null);

  // useEffect(() => {
  //   start();
  // }, []);

  return (
    <>
      <Total>
        <Label>Total</Label>
        {/* <Value>{total != null ? format(total, 'HH:mm:s') : '00:00.0'}</Value> */}
        <Value>{format(addSeconds(new Date(0), totalTime), 'mm:ss')}</Value>
      </Total>
      <Lap>
        <Label>Lap</Label>
        <Value>{format(addSeconds(new Date(0), lapTime), 'mm:ss')}</Value>
      </Lap>
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
