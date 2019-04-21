import React from 'react';
import { number, func } from 'prop-types';
import { connect } from 'react-redux';

import DisplayTime from './DisplayTime';
import Actions from './Actions';
import LapsHistory from './LapsHistory';
import { Selectors } from 'redux/clock/stopwatch';

export function StopWatch({ totalTime, lapTime }) {
  return (
    <>
      <DisplayTime label="Total" value={totalTime} />
      <DisplayTime label="Lap" value={lapTime} />
      <LapsHistory />
      <Actions />
    </>
  );
}

StopWatch.propTypes = {
  totalTime: number.isRequired,
  lapTime: number.isRequired,
  dispatch: func.isRequired,
};

function mapStateToProps(state) {
  return {
    totalTime: Selectors.getTotalTime(state),
    lapTime: Selectors.getLapTime(state),
  };
}

export default connect(mapStateToProps)(StopWatch);
