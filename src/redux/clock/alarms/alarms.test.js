import alarmsReducer, {
  ActionTypes,
  ActionCreators,
  Selectors,
} from './alarms';

describe('Alarms Action Creators', () => {
  it('should create an action to set an alarm', () => {
    const alarmId = 1;
    const active = true;
    const expectedAction = {
      type: `${ActionTypes.SET_ALARM}.${alarmId}`,
      payload: {
        alarmId,
        active,
      },
    };

    expect(ActionCreators.setAlarm(alarmId, active)).toEqual(expectedAction);
  });

  it('should create an action to unset an alarm', () => {
    const alarmId = 1;
    const active = false;
    const expectedAction = {
      type: `${ActionTypes.SET_ALARM}.${alarmId}`,
      payload: {
        alarmId,
        active,
      },
    };

    expect(ActionCreators.setAlarm(alarmId, active)).toEqual(expectedAction);
  });

  it('should create an action to update alarm time', () => {
    const alarmId = 1;
    const time = 400;
    const expectedAction = {
      type: `${ActionTypes.UPDATE_ALARM_TIME}.${alarmId}`,
      payload: {
        alarmId,
        time,
      },
    };

    expect(ActionCreators.updateAlarmTime(alarmId, time)).toEqual(
      expectedAction,
    );
  });

  it('should create an action to update alarm days', () => {
    const alarmId = 1;
    const day = 4;
    const expectedAction = {
      type: `${ActionTypes.UPDATE_ALARM_DAYS}.${alarmId}`,
      payload: {
        alarmId,
        day,
      },
    };

    expect(ActionCreators.updateAlarmDays(alarmId, day)).toEqual(
      expectedAction,
    );
  });
});

describe('Alarms Reducer', () => {
  const initialState = {
    1: {
      time: 360,
      selectedDays: [],
      active: false,
    },
    2: {
      time: 540,
      selectedDays: [],
      active: false,
    },
    3: {
      time: 720,
      selectedDays: [],
      active: false,
    },
    4: {
      time: 900,
      selectedDays: [],
      active: false,
    },
  };

  it('should return the initial state', () => {
    expect(alarmsReducer(undefined, { type: '@redux.INIT' })).toEqual(
      initialState,
    );
  });

  it('should handle SET_ALARM action', () => {
    const alarmId = 2;
    const active = true;
    expect(
      alarmsReducer(initialState, ActionCreators.setAlarm(alarmId, active)),
    ).toEqual({
      ...initialState,
      [alarmId]: {
        ...initialState[alarmId],
        active,
      },
    });
  });

  it('should handle UPDATE_ALARM_TIME action', () => {
    const alarmId = 1;
    const time = 600;
    expect(
      alarmsReducer(
        initialState,
        ActionCreators.updateAlarmTime(alarmId, time),
      ),
    ).toEqual({
      ...initialState,
      [alarmId]: {
        ...initialState[alarmId],
        time,
      },
    });
  });

  it('should handle UPDATE_ALARM_DAYS action', () => {
    const alarmId = 1;
    const day = 4;

    let nextState = alarmsReducer(
      initialState,
      ActionCreators.updateAlarmDays(alarmId, day),
    );
    expect(nextState).toEqual({
      ...initialState,
      [alarmId]: {
        ...initialState[alarmId],
        selectedDays: [day],
      },
    });

    nextState = alarmsReducer(
      nextState,
      ActionCreators.updateAlarmDays(alarmId, day),
    );
    expect(nextState).toEqual({
      ...initialState,
      [alarmId]: {
        ...initialState[alarmId],
        selectedDays: [],
      },
    });
  });
});

describe('Alarms Selectors', () => {
  const alarmsState = {
    1: {
      time: 360,
      selectedDays: [],
      active: false,
    },
    2: {
      time: 540,
      selectedDays: [],
      active: false,
    },
  };
  const mockedState = {
    clockApp: {
      alarms: alarmsState,
    },
  };

  it('should return alarm time', () => {
    expect(Selectors.getAlarmTime(mockedState, 1)).toEqual(alarmsState[1].time);
  });

  it('should return selected days', () => {
    expect(Selectors.getSelectedDays(mockedState, 1)).toEqual(
      alarmsState[1].selectedDays,
    );
  });

  it('should return alarm keys', () => {
    expect(Selectors.getAlarmsKeys(mockedState)).toEqual(
      Object.keys(alarmsState),
    );
  });

  it('should return alarm data by id', () => {
    expect(Selectors.getAlarmDataByKey(mockedState, 1)).toEqual(alarmsState[1]);
  });
});
