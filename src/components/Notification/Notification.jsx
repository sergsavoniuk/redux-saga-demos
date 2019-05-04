import React from 'react';
import { connect } from 'react-redux';
import { createPortal } from 'react-dom';
import { string, number, func, shape } from 'prop-types';

import NotificationAudio from './NotificationAudio';
import {
  Notification as StyledNotification,
  Title,
  Body,
  CloseButton,
} from './Notification.components';
import { Selectors, ActionCreators } from 'redux/notifications';

const element = document.getElementById('modal');

export function Notification({ notification, closeNotification }) {
  const { id, title, body, mediaSrc } = notification;

  function handleCloseNotification() {
    element.classList.add('hidden');
    closeNotification(id);
  }

  if (id !== undefined) {
    element.classList.remove('hidden');

    return createPortal(
      <StyledNotification>
        <Title>{title}</Title>
        <Body>{body}</Body>
        <CloseButton onClick={handleCloseNotification}>Close</CloseButton>
        <NotificationAudio src={mediaSrc} />
      </StyledNotification>,
      element,
    );
  }

  element.classList.add('hidden');

  return null;
}

Notification.propTypes = {
  notification: shape({
    id: number.isRequired,
    title: string.isRequired,
    body: string.isRequired,
    mediaSrc: string.isRequired,
  }).isRequired,
  closeNotification: func.isRequired,
};

function mapStateToProps(state) {
  return {
    notification: Selectors.getActiveNotification(state),
  };
}

export default connect(
  mapStateToProps,
  {
    closeNotification: ActionCreators.removeNotificationFromQueue,
  },
)(Notification);
