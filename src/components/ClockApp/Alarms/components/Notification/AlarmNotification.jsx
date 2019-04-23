import React from 'react';

import { Notification, Title, Body } from './AlarmNotification.components';

function AlarmNotification() {
  return (
    <Notification>
      <Title>Alarm Notification</Title>
      <Body>The alarm will go off after 10 minutes</Body>
    </Notification>
  );
}

export default AlarmNotification;
