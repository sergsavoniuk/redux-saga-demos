import React, { useReducer, useEffect } from 'react';
import { number, bool, func, arrayOf, shape } from 'prop-types';
import { connect } from 'react-redux';

import TimeField, { Separator, Box } from 'components/ClockApp/TimeField';
import Days from '../Days';
import SetAlarmButton from '../SetAlarmButton';
import { Wrapper } from './Alarm.components';
import { Selectors, ActionCreators } from 'redux/clock/alarms';
import { reducer, init } from 'components/ClockApp/TimeField/utils';

export function Alarm({
  alarm: { time = 0, selectedDays = [], active = false },
  setAlarm,
  updateAlarmTime,
  updateAlarmDays,
}) {
  const [{ hours, minutes }, dispatch] = useReducer(
    reducer,
    { startTime: time, inSeconds: false },
    init,
  );

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
      <Days
        active={active}
        selectedDays={selectedDays}
        changeAlarmDay={updateAlarmDays}
      />
      <SetAlarmButton
        checked={active}
        disabled={selectedDays.length === 0}
        setAlarm={setAlarm}
      />
    </Wrapper>
  );
}

Alarm.propTypes = {
  alarm: shape({
    time: number,
    selectedDays: arrayOf(number),
    active: bool,
  }).isRequired,
  setAlarm: func.isRequired,
  updateAlarmTime: func.isRequired,
  updateAlarmDays: func.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    alarm: Selectors.getAlarmDataByKey(state, ownProps.alarmId),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    setAlarm: function(active) {
      dispatch(ActionCreators.setAlarm(ownProps.alarmId, active));
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
