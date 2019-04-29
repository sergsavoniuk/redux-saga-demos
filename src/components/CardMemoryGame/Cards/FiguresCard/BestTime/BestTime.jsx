import React from 'react';
import { format } from 'date-fns';

import { Wrapper, Row, Label, Value } from './BestTime.components';

function BestTime({ casual, medium, hard }) {
  return (
    <Wrapper>
      <Row>
        <Label>Best Casual:</Label>
        <Value>{casual ? `${format(casual, 'ss.SSS')}s` : '-:-'}</Value>
      </Row>
      <Row>
        <Label>Best Medium:</Label>
        <Value>{medium ? `${format(medium, 'ss.SSS')}s` : '-:-'}</Value>
      </Row>
      <Row>
        <Label>Best Hard:</Label>
        <Value>{hard ? `${format(hard, 'ss.SSS')}s` : '-:-'}</Value>
      </Row>
    </Wrapper>
  );
}

export default BestTime;
