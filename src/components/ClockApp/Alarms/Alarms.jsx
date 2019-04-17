import React from 'react';
import { connect } from 'react-redux';

import Alarm from './components/Alarm';
import { Wrapper } from './Alarms.components';
import { Selectors } from 'redux/clock/alarms';

export function Alarms({ alarmKeys }) {
  return (
    <Wrapper>
      {alarmKeys.map(alarmKey => (
        <Alarm key={alarmKey} alarmId={+alarmKey} />
      ))}
    </Wrapper>
  );
}

function mapStateToProps(state) {
  return {
    alarmKeys: Selectors.getAlarmsKeys(state),
  };
}

export default connect(mapStateToProps)(Alarms);
