import { TimerStatuses } from 'constants/clock/timerStatuses';

// Action types
export const ActionTypes = {
  START: '@clock/timer/START',
  STOP: '@clock/timer/STOP',
  RESET: '@clock/timer/RESET',
  FINISH: '@clock/timer/FINISH',
  TICK: '@clock/timer/TICK',
  SET_START_TIME: '@clock/timer/SET_START_TIME',
};

// Action creators
export const ActionCreators = {
  start(time) {
    return {
      type: ActionTypes.START,
      payload: {
        time,
      },
    };
  },

  stop() {
    return {
      type: ActionTypes.STOP,
    };
  },

  reset() {
    return {
      type: ActionTypes.RESET,
    };
  },

  finish() {
    return {
      type: ActionTypes.FINISH,
    };
  },

  tick(time) {
    return {
      type: ActionTypes.TICK,
      payload: {
        time,
      },
    };
  },

  setStartTime(time) {
    return {
      type: ActionTypes.SET_START_TIME,
      payload: {
        time,
      },
    };
  },
};

// Reducer

const initialState = {
  status: TimerStatuses.PENDING,
  startTime: 0,
  remainedTime: 0,
};

export default function timerReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.START: {
      const time = action.payload.time;
      return {
        ...state,
        status: TimerStatuses.RUNNING,
        startTime: time,
        remainedTime: time,
      };
    }
    case ActionTypes.STOP: {
      return {
        ...state,
        status: TimerStatuses.STOPPED,
      };
    }
    case ActionTypes.RESET: {
      return {
        ...state,
        status: TimerStatuses.PENDING,
        remainedTime: 0,
      };
    }
    case ActionTypes.FINISH: {
      return {
        ...state,
        status: TimerStatuses.FINISHED,
      };
    }
    case ActionTypes.TICK: {
      return {
        ...state,
        remainedTime: action.payload.time,
      };
    }
    case ActionTypes.SET_START_TIME: {
      return {
        ...state,
        startTime: action.payload.time,
      };
    }
    default:
      return state;
  }
}

// Selectors
export const Selectors = {
  getStatus(state) {
    return state.clockApp.timer.status;
  },

  getStartTime(state) {
    return state.clockApp.timer.startTime;
  },

  getRemainedTime(state) {
    return state.clockApp.timer.remainedTime;
  },
};
