// Action types
export const ActionTypes = {
  SET_ALARM: '@clock/alarms/SET_ALARM',
  UPDATE_ALARM_TIME: '@clock/alarms/UPDATE_ALARM_TIME',
  UPDATE_ALARM_DAYS: '@clock/alarms/UPDATE_ALARM_DAYS',
};

// Action creators
export const ActionCreators = {
  setAlarm(alarmId, active) {
    return {
      type: `${ActionTypes.SET_ALARM}.${alarmId}`,
      payload: {
        alarmId,
        active,
      },
    };
  },

  updateAlarmTime(alarmId, time) {
    return {
      type: `${ActionTypes.UPDATE_ALARM_TIME}.${alarmId}`,
      payload: {
        alarmId,
        time,
      },
    };
  },

  updateAlarmDays(alarmId, day) {
    return {
      type: `${ActionTypes.UPDATE_ALARM_DAYS}.${alarmId}`,
      payload: {
        alarmId,
        day,
      },
    };
  },
};

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

// Reducer
export default function alarmsReducer(state = initialState, action) {
  const [extractedAction] = action.type.split('.');

  switch (extractedAction) {
    case ActionTypes.SET_ALARM: {
      const { alarmId, active } = action.payload;
      return {
        ...state,
        [alarmId]: {
          ...state[alarmId],
          active,
          selectedDays: active ? state[alarmId].selectedDays : [],
        },
      };
    }
    case ActionTypes.UPDATE_ALARM_TIME: {
      const { alarmId, time } = action.payload;
      return {
        ...state,
        [alarmId]: {
          ...state[alarmId],
          time,
        },
      };
    }
    case ActionTypes.UPDATE_ALARM_DAYS: {
      const { alarmId, day: selectedDay } = action.payload;
      return {
        ...state,
        [alarmId]: {
          ...state[alarmId],
          selectedDays: state[alarmId].selectedDays.includes(selectedDay)
            ? state[alarmId].selectedDays.filter(day => day !== selectedDay)
            : state[alarmId].selectedDays.concat(selectedDay),
        },
      };
    }
    default:
      return state;
  }
}

// Selectors
export const Selectors = {
  getAlarmTime(state, alarmId) {
    return state.clockApp.alarms[alarmId].time;
  },

  getSelectedDays(state, alarmId) {
    return state.clockApp.alarms[alarmId].selectedDays;
  },

  getAlarmsKeys(state) {
    return Object.keys(state.clockApp.alarms);
  },

  getAlarmDataByKey(state, alarmKey) {
    return state.clockApp.alarms[alarmKey];
  },
};
