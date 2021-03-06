import React from 'react';

import { Wrapper, Row, Label, Value } from './Figures.components';

function Figures({ won = 0, lost = 0, abandoned = 0 }) {
  return (
    <Wrapper>
      Figures:
      <Row>
        <Value>{won}</Value>
        <Label>won</Label>
      </Row>
      <Row>
        <Value>{lost}</Value>
        <Label>lost</Label>
      </Row>
      <Row>
        <Value>{abandoned}</Value>
        <Label>abandoned</Label>
      </Row>
    </Wrapper>
  );
}

export default Figures;
