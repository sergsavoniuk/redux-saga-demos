// Action types
export const ActionTypes = {
  ADD_NOTIFICATION_TO_QUEUE: '@clock/notifications/ADD_NOTIFICATION_TO_QUEUE',
  REMOVE_NOTIFICATION_FROM_QUEUE:
    '@clock/notifications/REMOVE_NOTIFICATION_FROM_QUEUE',
};

let notificationId = 0;

// Action creators
export const ActionCreators = {
  addNotificationToQueue({ title, entityName, body }) {
    return {
      type: ActionTypes.ADD_NOTIFICATION_TO_QUEUE,
      payload: {
        id: notificationId++,
        entityName,
        title,
        body,
      },
    };
  },

  removeNotificationFromQueue(id) {
    return {
      type: ActionTypes.REMOVE_NOTIFICATION_FROM_QUEUE,
      payload: {
        id,
      },
    };
  },
};

// Reducer

const initialState = {
  active: null,
  all: [],
};

export default function notificationsReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ADD_NOTIFICATION_TO_QUEUE: {
      return {
        ...state,
        all: state.all.concat(action.payload),
        active: state.active || state.all[0] || action.payload,
      };
    }
    case ActionTypes.REMOVE_NOTIFICATION_FROM_QUEUE: {
      const all = state.all.filter(
        notification => notification.id !== action.payload.id,
      );
      return {
        ...state,
        all,
        active: all[0] || null,
      };
    }
    default:
      return state;
  }
}

// Selectors
export const Selectors = {
  getActiveNotification(state) {
    return state.notifications.active;
  },
};
