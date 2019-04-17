// Action types
export const ActionTypes = {
  SET_ALARM: '@clock/alarms/SET_ALARM',
  UPDATE_ALARM_TIME: '@clock/alarms/UPDATE_ALARM_TIME',
  UPDATE_ALARM_DAYS: '@clock/alarms/UPDATE_ALARM_DAYS',
  SET_ALARM_WENT_OFF: '@clock/alarms/SET_ALARM_WENT_OFF',
};

// Action creators
export const ActionCreators = {
  setAlarm(alarmId) {
    return {
      type: `${ActionTypes.SET_ALARM}.${alarmId}`,
      payload: {
        alarmId,
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

  setAlarmWentOff(alarmId, isAlarmWentOff) {
    return {
      type: `${ActionTypes.SET_ALARM_WENT_OFF}.${alarmId}`,
      payload: {
        alarmId,
        isAlarmWentOff,
      },
    };
  },
};

const initialState = {
  alarms: {
    1: {
      time: 360,
      selectedDays: [],
      isAlarmWentOff: false,
      active: false,
    },
    2: {
      time: 540,
      selectedDays: [],
      isAlarmWentOff: false,
      active: false,
    },
    3: {
      time: 720,
      selectedDays: [],
      isAlarmWentOff: false,
      active: false,
    },
    4: {
      time: 900,
      selectedDays: [],
      isAlarmWentOff: false,
      active: false,
    },
  },
};

// Reducer
export default function alarmsReducer(state = initialState, action) {
  const [extractedAction] = action.type.split('.');

  switch (extractedAction) {
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
      const { alarmId, day: selectedDay } = action.payload;
      return {
        ...state,
        alarms: {
          ...state.alarms,
          [alarmId]: {
            ...state.alarms[alarmId],
            selectedDays: state.alarms[alarmId].selectedDays.includes(
              selectedDay,
            )
              ? state.alarms[alarmId].selectedDays.filter(
                  day => day !== selectedDay,
                )
              : state.alarms[alarmId].selectedDays.concat(selectedDay),
          },
        },
      };
    }
    case ActionTypes.SET_ALARM_WENT_OFF: {
      const { alarmId, isAlarmWentOff } = action.payload;
      return {
        ...state,
        alarms: {
          ...state.alarms,
          [alarmId]: {
            ...state.alarms[alarmId],
            isAlarmWentOff,
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
  getAlarmTime(state, alarmId) {
    return state.clockApp.alarms.alarms[alarmId].time;
  },

  getSelectedDays(state, alarmId) {
    return state.clockApp.alarms.alarms[alarmId].selectedDays;
  },

  getIsAlarmWentOff(state, alarmId) {
    return state.clockApp.alarms.alarms[alarmId].isAlarmWentOff;
  },

  getAlarmsKeys(state) {
    return Object.keys(state.clockApp.alarms.alarms);
  },

  getAlarmDataByKey(state, alarmKey) {
    return state.clockApp.alarms.alarms[alarmKey];
  },
};
