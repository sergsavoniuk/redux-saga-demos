import React from 'react';

import { Wrapper, Box } from './Days.components';
import Checkbox from '../Checkbox';

function Days() {
  return (
    <Wrapper>
      <h3>Description</h3>
      <Box>
        <Checkbox label="Mo" onChange={() => {}} />
        <Checkbox label="Tu" onChange={() => {}} />
        <Checkbox checked label="We" onChange={() => {}} />
        <Checkbox label="Th" onChange={() => {}} />
        <Checkbox label="Fr" onChange={() => {}} />
        <Checkbox label="Sa" onChange={() => {}} />
        <Checkbox label="Su" onChange={() => {}} />
      </Box>
    </Wrapper>
  );
}

export default Days;
