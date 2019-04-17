// Action types
export const ActionTypes = {
  SET_ALARM: '@clock/alarms/SET_ALARM',
  UPDATE_ALARM_TIME: '@clock/alarms/UPDATE_ALARM_TIME',
  UPDATE_ALARM_DAYS: '@clock/alarms/UPDATE_ALARM_DAYS',
};

// Action creators
export const ActionCreators = {
  setAlarm(alarmId) {
    return {
      type: ActionTypes.SET_ALARM,
      payload: {
        alarmId,
      },
    };
  },

  updateAlarmTime(alarmId, time) {
    return {
      type: ActionTypes.UPDATE_ALARM_TIME,
      payload: {
        alarmId,
        time,
      },
    };
  },

  updateAlarmDays(alarmId, day) {
    return {
      type: ActionTypes.UPDATE_ALARM_DAYS,
      payload: {
        alarmId,
        day,
      },
    };
  },
};

const initialState = {
  alarms: {
    1: {
      time: 360,
      selectedDays: {},
      active: false,
    },
    2: {
      time: 540,
      selectedDays: {},
      active: false,
    },
    3: {
      time: 720,
      selectedDays: {},
      active: false,
    },
    4: {
      time: 900,
      selectedDays: {},
      active: false,
    },
  },
};

// Reducer
export default function alarmsReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_ALARM: {
      const { alarmId } = action.payload;
      return {
        ...state,
        alarms: {
          ...state.alarms,
          [alarmId]: {
            ...state.alarms[alarmId],
            active: !state.alarms[alarmId].active,
          },
        },
      };
    }
    case ActionTypes.UPDATE_ALARM_TIME: {
      const { alarmId, time } = action.payload;
      return {
        ...state,
        alarms: {
          ...state.alarms,
          [alarmId]: {
            ...state.alarms[alarmId],
            time,
          },
        },
      };
    }
    case ActionTypes.UPDATE_ALARM_DAYS: {
      const { alarmId, day } = action.payload;
      return {
        ...state,
        alarms: {
          ...state.alarms,
          [alarmId]: {
            ...state.alarms[alarmId],
            selectedDays: {
              ...state.alarms[alarmId].selectedDays,
              [day]: !state.alarms[alarmId].selectedDays[day],
            },
          },
        },
      };
    }
    default:
      return state;
  }
}

// Selectors
export const Selectors = {
  getAlarmsKeys(state) {
    return Object.keys(state.clockApp.alarms.alarms);
  },

  getAlarmDataByKey(state, alarmKey) {
    return state.clockApp.alarms.alarms[alarmKey];
  },
};
