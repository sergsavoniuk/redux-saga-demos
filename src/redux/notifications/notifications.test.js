import notificationsReducer, {
  ActionTypes,
  ActionCreators,
  Selectors,
} from './notifications';

const utils = {
  notifications: [],

  createNotification() {
    const action = ActionCreators.addNotificationToQueue({
      title: '',
      body: '',
      mediaSrc: '',
    });
    this.notifications.push(action.payload);
    return action;
  },
};

describe('Notifications Action Types', () => {
  it('should create an action to add a notification to the notifications queue', () => {
    const payload = {
      id: 0,
      title: 'Notification title',
      body: 'Notification body',
      mediaSrc: '',
    };
    const expectedAction = {
      type: ActionTypes.ADD_NOTIFICATION_TO_QUEUE,
      payload,
    };

    expect(ActionCreators.addNotificationToQueue(payload)).toEqual(
      expectedAction,
    );
  });

  it('should create an action to remove a notification from the notifications queue', () => {
    const notificationId = 0;
    const expectedAction = {
      type: ActionTypes.REMOVE_NOTIFICATION_FROM_QUEUE,
      payload: {
        id: notificationId,
      },
    };

    expect(ActionCreators.removeNotificationFromQueue(notificationId)).toEqual(
      expectedAction,
    );
  });
});

describe('Notifications Reducer', () => {
  const initialState = {
    active: null,
    all: [],
  };

  it('reducer should return the initial state', () => {
    expect(notificationsReducer(undefined, {})).toEqual(initialState);
  });

  it('reducer should add a notification to the notifications queue', () => {
    let nextState = notificationsReducer(
      initialState,
      utils.createNotification(),
    );
    expect(nextState).toEqual({
      all: utils.notifications,
      active: utils.notifications[0],
    });

    nextState = notificationsReducer(nextState, utils.createNotification());
    expect(nextState).toEqual({
      all: utils.notifications,
      active: utils.notifications[0],
    });
  });

  it('reducer should remove a notification from the notifications queue', () => {
    let nextState = notificationsReducer(
      {
        active: { id: 0, title: '', body: '' },
        all: [{ id: 0, title: '', body: '' }, { id: 1, title: '', body: '' }],
      },
      ActionCreators.removeNotificationFromQueue(0),
    );
    expect(nextState).toEqual({
      all: [{ id: 1, title: '', body: '' }],
      active: { id: 1, title: '', body: '' },
    });

    nextState = notificationsReducer(
      nextState,
      ActionCreators.removeNotificationFromQueue(1),
    );
    expect(nextState).toEqual({
      all: [],
      active: null,
    });
  });
});

describe('Notifications Selectors', () => {
  const notificationsState = {
    active: { id: 0, title: '', body: '' },
    all: [{ id: 0, title: '', body: '' }],
  };
  const mockedState = {
    notifications: notificationsState,
  };

  it('should return active notification', () => {
    expect(Selectors.getActiveNotification(mockedState)).toEqual(
      notificationsState.active,
    );
  });
});
