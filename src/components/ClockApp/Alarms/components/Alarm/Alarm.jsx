import React, { useReducer, useEffect } from 'react';
import { connect } from 'react-redux';

import TimeField, { Separator, Box } from 'components/ClockApp/TimeField';
import Days from '../Days';
import SetAlarmButton from '../SetAlarmButton';
import { Wrapper } from './Alarm.components';
import { Selectors, ActionCreators } from 'redux/clock/alarms';
import { reducer, init } from 'components/ClockApp/TimeField/utils';

export function Alarm({
  alarm: { time, selectedDays, active },
  setAlarm,
  updateAlarmTime,
  updateAlarmDays,
}) {
  const [{ hours, minutes }, dispatch] = useReducer(reducer, time, init);

  useEffect(() => {
    updateAlarmTime(
      `${hours}:${minutes}`.split(':').reduce((acc, time) => 60 * acc + +time),
    );
  }, [hours, minutes]);

  return (
    <Wrapper>
      <Box>
        <TimeField
          name="hours"
          label="Hours"
          disabled={active}
          value={hours}
          onChange={dispatch}
        />
        <Separator>:</Separator>
        <TimeField
          name="minutes"
          label="Mins."
          disabled={active}
          value={minutes}
          onChange={dispatch}
        />
      </Box>
      <Days selectedDays={selectedDays} changeAlarmDay={updateAlarmDays} />
      <SetAlarmButton checked={active} setAlarm={setAlarm} />
    </Wrapper>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    alarm: Selectors.getAlarmDataByKey(state, ownProps.alarmId),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    setAlarm: function() {
      dispatch(ActionCreators.setAlarm(ownProps.alarmId));
    },
    updateAlarmTime: function(time) {
      dispatch(ActionCreators.updateAlarmTime(ownProps.alarmId, time));
    },
    updateAlarmDays: function(day) {
      dispatch(ActionCreators.updateAlarmDays(ownProps.alarmId, day));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Alarm);
