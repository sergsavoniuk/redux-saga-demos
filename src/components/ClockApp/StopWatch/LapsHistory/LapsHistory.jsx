import React from 'react';
import { arrayOf, shape, number, func } from 'prop-types';
import { connect } from 'react-redux';

import { Table, TableBody, TableHeader } from './LapsHistoryTable';
import { Selectors } from 'redux/clock/stopwatch';

export function LapsHistory({ lapsHistory }) {
  return (
    lapsHistory.length > 0 && (
      <Table>
        <TableHeader />
        <TableBody lapsHistory={lapsHistory} />
      </Table>
    )
  );
}

LapsHistory.propTypes = {
  lapsHistory: arrayOf(
    shape({
      lap: number.isRequired,
      total: number.isRequired,
      lapResult: number.isRequired,
    }).isRequired,
  ).isRequired,
  dispatch: func.isRequired,
};

function mapStateToProps(state) {
  return {
    lapsHistory: Selectors.getLapsHistory(state),
  };
}

export default connect(mapStateToProps)(LapsHistory);
