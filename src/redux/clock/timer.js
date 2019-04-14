import { TimerStatuses } from 'constants/timerStatuses';

// Action types
export const ActionTypes = {
  START: '@clock/timer/START',
  STOP: '@clock/timer/STOP',
  RESET: '@clock/timer/RESET',
  TICK: '@clock/timer/TICK',
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

  tick(time) {
    return {
      type: ActionTypes.TICK,
      payload: {
        time,
      },
    };
  },
};

// Reducer

const initialState = {
  status: TimerStatuses.PENDING,
  startTime: null,
  remainedTime: null,
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
        ...initialState,
      };
    }
    case ActionTypes.TICK: {
      return {
        ...state,
        remainedTime: action.payload.time,
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
