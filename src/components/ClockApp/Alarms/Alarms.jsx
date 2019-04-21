import React from 'react';
import { arrayOf, string, func } from 'prop-types';
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

Alarms.propTypes = {
  alarmKeys: arrayOf(string).isRequired,
  dispatch: func.isRequired,
};

function mapStateToProps(state) {
  return {
    alarmKeys: Selectors.getAlarmsKeys(state),
  };
}

export default connect(mapStateToProps)(Alarms);
