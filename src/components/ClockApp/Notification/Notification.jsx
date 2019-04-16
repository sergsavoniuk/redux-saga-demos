import React from 'react';
import { createPortal } from 'react-dom';

import NotificationAudio from './NotificationAudio';
import {
  Notification as StyledNotification,
  Title,
  Body,
  CloseButton,
} from './Notification.components';

const element = document.getElementById('modal');

function Notification({ visible, onClose: handleCloseNotification }) {
  if (visible) {
    element.classList.remove('hidden');

    return createPortal(
      <StyledNotification>
        <Title>Timer</Title>
        <Body>The time is up!</Body>
        <CloseButton onClick={handleCloseNotification}>Close</CloseButton>
        <NotificationAudio />
      </StyledNotification>,
      element,
    );
  }

  element.classList.add('hidden');

  return null;
}

export default Notification;
