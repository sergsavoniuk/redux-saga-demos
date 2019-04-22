import React from 'react';
import { number } from 'prop-types';
import { format, subSeconds } from 'date-fns';

import { secsToTime } from 'components/ClockApp/TimeField/utils';
import { RemainedTime as StyledRemainedTime } from './RemainedTime.components';

function RemainedTime({ remainedTime }) {
  return (
    <StyledRemainedTime>
      {remainedTime > 0
        ? format(subSeconds(secsToTime(remainedTime), 1), 'HH:mm:ss')
        : '00:00:00'}
    </StyledRemainedTime>
  );
}

RemainedTime.propTypes = {
  remainedTime: number.isRequired,
};

export default RemainedTime;
