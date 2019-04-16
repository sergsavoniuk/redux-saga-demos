import React from 'react';
import { createPortal } from 'react-dom';

import {
  Notification as StyledNotification,
  Title,
  Body,
  CloseButton,
} from './Notification.components';

function Notification({ visible, onClose: handleCloseNotification }) {
  const element = document.getElementById('modal');

  if (visible) {
    element.classList.remove('hidden');

    return createPortal(
      <StyledNotification>
        <Title>Timer</Title>
        <Body>The time is up!</Body>
        <CloseButton onClick={handleCloseNotification}>Close</CloseButton>
      </StyledNotification>,
      element,
    );
  }

  element.classList.add('hidden');

  return null;
}

export default Notification;
