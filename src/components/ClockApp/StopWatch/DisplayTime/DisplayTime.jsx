import React, { memo } from 'react';
import { string, number } from 'prop-types';
import { format, addMilliseconds } from 'date-fns';

import { Label, Value, Box } from './DisplayTime.components';

function DisplayTime({ label, value }) {
  return (
    <>
      <Box marginBottom={label === 'Lap'}>
        <Label>{label}</Label>
        <Value>{format(addMilliseconds(new Date(0), value), 'mm:ss')}</Value>
      </Box>
    </>
  );
}

DisplayTime.propTypes = {
  label: string.isRequired,
  value: number.isRequired,
};

export default memo(DisplayTime);
