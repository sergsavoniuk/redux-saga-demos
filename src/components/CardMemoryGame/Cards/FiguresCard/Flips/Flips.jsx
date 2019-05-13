import React from 'react';

import { Wrapper, Row, Span as Label, Span as Value } from './Flips.components';

function Flips({ matched, wrong }) {
  return (
    <Wrapper>
      <Row>
        <Label>Total Flips:</Label>
        <Value>{2 * (matched + wrong)}</Value>
      </Row>
      <Row>
        <Label>Matched Flips:</Label>
        <Value>{matched}</Value>
      </Row>
      <Row>
        <Label>Wrong Flips:</Label>
        <Value>{wrong}</Value>
      </Row>
    </Wrapper>
  );
}

export default Flips;
