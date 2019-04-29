import React from 'react';

import { Title, Won, Lost, Label, Value } from './Figures.components';

function Figures({ won, lost }) {
  return (
    <>
      <Title>
        Figures:
        <Won>
          <Value>{won}</Value>
          <Label>won</Label>
        </Won>
        <Lost>
          <Value>{lost}</Value>
          <Label>lost</Label>
        </Lost>
      </Title>
    </>
  );
}

export default Figures;
