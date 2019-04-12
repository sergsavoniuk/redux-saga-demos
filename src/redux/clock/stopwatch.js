// Action types

export const START = 'START';
export const STOP = 'STOP';
export const RESET = 'RESET';
export const TOTAL_TICK = 'TOTAL_TICK';
export const LAP_TICK = 'LAP_TICK';
export const SET_LAP_TIME = 'SET_LAP_TIME';

// Action creators

export function start(time) {
  return {
    type: START,
    payload: {
      time: 0,
    },
  };
}

export function stop(time) {
  return {
    type: STOP,
    payload: {
      time,
    },
  };
}

export function reset() {
  return {
    type: RESET,
  };
}

export function totalTick(time) {
  return {
    type: TOTAL_TICK,
    payload: {
      time,
    },
  };
}

export function lapTick(time) {
  return {
    type: LAP_TICK,
    payload: {
      time,
    },
  };
}

export function setLapTime(time) {
  return {
    type: SET_LAP_TIME,
    payload: {
      time,
    },
  };
}

const initialState = {
  running: false,
  totalTime: 0,
  lapTime: 0,
  lapsHistory: [],
};

// Reducer

export default function stopwatchReducer(state = initialState, action) {
  switch (action.type) {
    case START: {
      return {
        ...state,
        running: true,
        lapTime: 0,
        // totalTime: action.payload.time,
      };
    }
    case STOP: {
      return {
        ...state,
        running: false,
        lapsHistory: state.lapsHistory.concat({
          lap: state.lapsHistory.length + 1,
          total: state.totalTime,
          lapResult: state.lapTime,
        }),
      };
    }
    case RESET: {
      return {
        ...state,
        ...initialState,
      };
    }
    case TOTAL_TICK: {
      return {
        ...state,
        totalTime: action.payload.time,
      };
    }
    case LAP_TICK: {
      return {
        ...state,
        lapTime: action.payload.time,
      };
    }
    case SET_LAP_TIME: {
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

// selectors
export const getStatus = state => state.clockApp.stopwatch.running;
export const getTotalTime = state => state.clockApp.stopwatch.totalTime;
export const getLapTime = state => state.clockApp.stopwatch.lapTime;
export const getLapsHistory = state => state.clockApp.stopwatch.lapsHistory;
