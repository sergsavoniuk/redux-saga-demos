import React from 'react';

import {
  Title,
  Won,
  Lost,
  Abandoned,
  Label,
  Value,
} from './Figures.components';

function Figures({ won, lost, abandoned }) {
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
        <Abandoned>
          <Value>{abandoned}</Value>
          <Label>abandoned</Label>
        </Abandoned>
      </Title>
    </>
  );
}

export default Figures;
