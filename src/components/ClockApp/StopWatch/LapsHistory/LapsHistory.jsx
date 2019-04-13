import React from 'react';
import { connect } from 'react-redux';

import { Table, TableBody, TableHeader } from './LapsHistoryTable';
import { getLapsHistory } from 'redux/clock/stopwatch';

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

function mapStateToProps(state) {
  return {
    lapsHistory: getLapsHistory(state),
  };
}

export default connect(mapStateToProps)(LapsHistory);
