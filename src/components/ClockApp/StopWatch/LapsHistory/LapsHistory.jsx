import React from 'react';
import { connect } from 'react-redux';

import { Table, TableBody, TableHeader } from './LapsHistoryTable';

export function LapsHistory() {
  return (
    <Table>
      <TableHeader />
      <TableBody />
    </Table>
  );
}

export default connect()(LapsHistory);
