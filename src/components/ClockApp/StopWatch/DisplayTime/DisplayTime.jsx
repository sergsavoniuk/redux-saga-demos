import React, { memo } from 'react';
import { format, addSeconds, addMilliseconds } from 'date-fns';

import { Label, Value, Box } from './DisplayTime.components';

function DisplayTime({ label, value }) {
  return (
    <>
      <Box marginBottom={label === 'Lap'}>
        <Label>{label}</Label>
        {/* <Value>{format(addSeconds(new Date(0), value), 'mm:ss')}</Value> */}
        <Value>{format(addMilliseconds(new Date(0), value), 'mm:ss')}</Value>
      </Box>
    </>
  );
}

export default memo(DisplayTime);
