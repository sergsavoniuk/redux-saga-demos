import React, { useReducer, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Notification from 'components/ClockApp/Notification';
import TimeField, { Separator, Box } from 'components/ClockApp/TimeField';
import Days from '../Days';
import SetAlarmButton from '../SetAlarmButton';
import { Wrapper } from './Alarm.components';
import { Selectors, ActionCreators } from 'redux/clock/alarms';
import { reducer, init } from 'components/ClockApp/TimeField/utils';

export function Alarm({
  alarm: { time, selectedDays, active },
  isAlarmWentOff,
  setAlarm,
  updateAlarmTime,
  updateAlarmDays,
  setAlarmWentOff,
}) {
  const [showNotification, setShowNotification] = useState(false);

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

  useEffect(() => {
    setShowNotification(isAlarmWentOff);
  }, [isAlarmWentOff]);

  function handleCloseNotification() {
    setAlarmWentOff(false);
    setShowNotification(false);
  }

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
      <SetAlarmButton checked={active} setAlarm={setAlarm} />
      <Notification
        title="Alarm"
        body="The alarm went off!"
        visible={showNotification}
        onClose={handleCloseNotification}
      />
    </Wrapper>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    alarm: Selectors.getAlarmDataByKey(state, ownProps.alarmId),
    isAlarmWentOff: Selectors.getIsAlarmWentOff(state, ownProps.alarmId),
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
    setAlarmWentOff: function(isAlarmWentOff) {
      dispatch(
        ActionCreators.setAlarmWentOff(ownProps.alarmId, isAlarmWentOff),
      );
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Alarm);
