import { StopwatchStatuses } from 'constants/clock/stopwatchStatuses';

// Action types
export const ActionTypes = {
  START: '@clock/stopwatch/START',
  STOP: '@clock/stopwatch/STOP',
  RESET: '@clock/stopwatch/RESET',
  TOTAL_TICK: '@clock/stopwatch/TOTAL_TICK',
  LAP_TICK: '@clock/stopwatch/LAP_TICK',
  SET_LAP_TIME: '@clock/stopwatch/SET_LAP_TIME',
};

// Action creators
export const ActionCreators = {
  start(time) {
    return {
      type: ActionTypes.START,
      payload: {
        time: 0,
      },
    };
  },

  stop(time) {
    return {
      type: ActionTypes.STOP,
      payload: {
        time,
      },
    };
  },

  reset() {
    return {
      type: ActionTypes.RESET,
    };
  },

  totalTick(time) {
    return {
      type: ActionTypes.TOTAL_TICK,
      payload: {
        time,
      },
    };
  },

  lapTick(time) {
    return {
      type: ActionTypes.LAP_TICK,
      payload: {
        time,
      },
    };
  },

  setLapTime(time) {
    return {
      type: ActionTypes.SET_LAP_TIME,
      payload: {
        time,
      },
    };
  },
};

const initialState = {
  status: StopwatchStatuses.PENDING,
  totalTime: 0,
  lapTime: 0,
  lapsHistory: [],
};

// Reducer
export default function stopwatchReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.START: {
      return {
        ...state,
        status: StopwatchStatuses.RUNNING,
        lapTime: 0,
        // totalTime: action.payload.time,
      };
    }
    case ActionTypes.STOP: {
      return {
        ...state,
        status: StopwatchStatuses.STOPPED,
        lapsHistory: state.lapsHistory.concat({
          lap: state.lapsHistory.length + 1,
          total: state.totalTime,
          lapResult: state.lapTime,
        }),
      };
    }
    case ActionTypes.RESET: {
      return {
        ...state,
        ...initialState,
      };
    }
    case ActionTypes.TOTAL_TICK: {
      return {
        ...state,
        totalTime: action.payload.time,
      };
    }
    case ActionTypes.LAP_TICK: {
      return {
        ...state,
        lapTime: action.payload.time,
      };
    }
    case ActionTypes.SET_LAP_TIME: {
      return {
        ...state,
        lapTime: 0,
        lapsHistory: state.lapsHistory.concat({
          lap: state.lapsHistory.length + 1,
          total: state.totalTime,
          lapResult: state.lapTime,
        }),
      };
    }
    default:
      return state;
  }
}

// Selectors
export const Selectors = {
  getStatus(state) {
    return state.clockApp.stopwatch.status;
  },

  getTotalTime(state) {
    return state.clockApp.stopwatch.totalTime;
  },

  getLapTime(state) {
    return state.clockApp.stopwatch.lapTime;
  },

  getLapsHistory(state) {
    return state.clockApp.stopwatch.lapsHistory;
  },
};
