import React from 'react';

import { Wrapper, Row, Label, Value } from './BestTime.components';

function BestTime({ casual, medium, hard }) {
  return (
    <Wrapper>
      <Row>
        <Label>Best Casual:</Label>
        <Value>{casual || '-:-'}</Value>
      </Row>
      <Row>
        <Label>Best Medium:</Label>
        <Value>{medium || '-:-'}</Value>
      </Row>
      <Row>
        <Label>Best Hard:</Label>
        <Value>{hard || '-:-'}</Value>
      </Row>
    </Wrapper>
  );
}

export default BestTime;
