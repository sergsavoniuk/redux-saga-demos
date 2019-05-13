import React from 'react';
import { format } from 'date-fns';

import {
  Wrapper,
  Row,
  Span as Label,
  Span as Value,
} from './BestTime.components';

const DEFAULT_PLACEHOLDER = '-:-';
const TIME_FORMAT = 'ss.SSS';

function BestTime({ casual, medium, hard }) {
  return (
    <Wrapper>
      <Row>
        <Label>Best Casual:</Label>
        <Value>
          {casual ? `${format(casual, TIME_FORMAT)}s` : DEFAULT_PLACEHOLDER}
        </Value>
      </Row>
      <Row>
        <Label>Best Medium:</Label>
        <Value>
          {medium ? `${format(medium, TIME_FORMAT)}s` : DEFAULT_PLACEHOLDER}
        </Value>
      </Row>
      <Row>
        <Label>Best Hard:</Label>
        <Value>
          {hard ? `${format(hard, TIME_FORMAT)}s` : DEFAULT_PLACEHOLDER}
        </Value>
      </Row>
    </Wrapper>
  );
}

export default BestTime;
