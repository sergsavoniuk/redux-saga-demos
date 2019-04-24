import timerReducer, { ActionTypes, ActionCreators, Selectors } from './timer';
import { TimerStatuses } from 'constants/clock/timerStatuses';

describe('Timer Action Creators', () => {
  it('should create an action to start a timer', () => {
    const time = 10;
    const expectedAction = {
      type: ActionTypes.START,
      payload: {
        time,
      },
    };

    expect(ActionCreators.start(time)).toEqual(expectedAction);
  });

  it('should create an action to stop a timer', () => {
    const expectedAction = {
      type: ActionTypes.STOP,
    };

    expect(ActionCreators.stop()).toEqual(expectedAction);
  });

  it('should create an action to reset a timer', () => {
    const expectedAction = {
      type: ActionTypes.RESET,
    };

    expect(ActionCreators.reset()).toEqual(expectedAction);
  });

  it('should create an action to finish a timer', () => {
    const expectedAction = {
      type: ActionTypes.FINISH,
    };

    expect(ActionCreators.finish()).toEqual(expectedAction);
  });

  it('should create an action to perform a tick', () => {
    const time = 9;
    const expectedAction = {
      type: ActionTypes.TICK,
      payload: {
        time,
      },
    };

    expect(ActionCreators.tick(time)).toEqual(expectedAction);
  });

  it('should create an action to set the start time of a timer', () => {
    const startTime = 10;
    const expectedAction = {
      type: ActionTypes.SET_START_TIME,
      payload: {
        time: startTime,
      },
    };

    expect(ActionCreators.setStartTime(startTime)).toEqual(expectedAction);
  });
});

describe('Timer Reducer', () => {
  const initialState = {
    status: TimerStatuses.PENDING,
    startTime: 0,
    remainedTime: 0,
  };

  it('should return the initial state', () => {
    expect(timerReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle START action', () => {
    const time = 10;
    expect(
      timerReducer(
        {
          status: TimerStatuses.PENDING,
          startTime: 0,
          remainedTime: 0,
        },
        ActionCreators.start(time),
      ),
    ).toEqual({
      status: TimerStatuses.RUNNING,
      startTime: time,
      remainedTime: time,
    });
  });

  it('should handle STOP action', () => {
    const state = {
      status: TimerStatuses.RUNNING,
      startTime: 10,
      remainedTime: 8,
    };

    expect(timerReducer(state, ActionCreators.stop())).toEqual({
      ...state,
      status: TimerStatuses.STOPPED,
    });
  });

  it('should handle RESET action', () => {
    const state = {
      status: TimerStatuses.RUNNING,
      startTime: 10,
      remainedTime: 8,
    };

    expect(timerReducer(state, ActionCreators.reset())).toEqual({
      ...initialState,
      startTime: state.startTime,
    });
  });

  it('should handle TICK action', () => {
    const state = {
      status: TimerStatuses.RUNNING,
      startTime: 10,
      remainedTime: 10,
    };

    const stateAfterTick = timerReducer(
      state,
      ActionCreators.tick(state.remainedTime - 1),
    );

    expect(stateAfterTick).toEqual({
      ...state,
      remainedTime: state.remainedTime - 1,
    });

    expect(
      timerReducer(
        stateAfterTick,
        ActionCreators.tick(stateAfterTick.remainedTime - 1),
      ),
    ).toEqual({
      ...stateAfterTick,
      remainedTime: stateAfterTick.remainedTime - 1,
    });
  });

  it('should handle FINISH action', () => {
    const state = {
      status: TimerStatuses.RUNNING,
      startTime: 10,
      remainedTime: 1,
    };

    const stateAfterTick = timerReducer(
      state,
      ActionCreators.tick(state.remainedTime - 1),
    );

    expect(stateAfterTick).toEqual({
      status: TimerStatuses.RUNNING,
      startTime: 10,
      remainedTime: 0,
    });

    expect(timerReducer(stateAfterTick, ActionCreators.finish())).toEqual({
      status: TimerStatuses.FINISHED,
      startTime: state.startTime,
      remainedTime: 0,
    });
  });

  it('should handle SET_START_TIME action', () => {
    const startTime = 10;
    expect(
      timerReducer(initialState, ActionCreators.setStartTime(startTime)),
    ).toEqual({
      ...initialState,
      startTime,
    });
  });

  it('should handle flow SET_START_TIME - START - TICK - STOP - START - TICK - FINISH', () => {
    const startTime = 2;

    let nextState = timerReducer(
      initialState,
      ActionCreators.setStartTime(startTime),
    );
    expect(nextState).toEqual({
      ...initialState,
      startTime,
    });

    nextState = timerReducer(nextState, ActionCreators.start(startTime));
    expect(nextState).toEqual({
      ...nextState,
      status: TimerStatuses.RUNNING,
    });

    nextState = timerReducer(
      nextState,
      ActionCreators.tick(nextState.remainedTime - 1),
    );
    expect(nextState).toEqual({
      ...nextState,
      remainedTime: nextState.remainedTime,
    });

    nextState = timerReducer(nextState, ActionCreators.stop());
    expect(nextState).toEqual({
      ...nextState,
      status: TimerStatuses.STOPPED,
    });

    nextState = timerReducer(
      nextState,
      ActionCreators.start(nextState.remainedTime),
    );
    expect(nextState).toEqual({
      ...nextState,
      status: TimerStatuses.RUNNING,
      startTime: nextState.remainedTime,
    });

    nextState = timerReducer(
      nextState,
      ActionCreators.tick(nextState.remainedTime - 1),
    );
    expect(nextState).toEqual({
      ...nextState,
      remainedTime: nextState.remainedTime,
    });

    nextState = timerReducer(nextState, ActionCreators.finish());
    expect(nextState).toEqual({
      ...nextState,
      status: TimerStatuses.FINISHED,
      remainedTime: nextState.remainedTime,
    });
  });
});

describe('Timer Selectors', () => {
  const status = TimerStatuses.PENDING;
  const startTime = 0;
  const remainedTime = 0;

  const mockedState = {
    clockApp: {
      timer: {
        status,
        startTime,
        remainedTime,
      },
    },
  };

  it('should return timer status', () => {
    expect(Selectors.getStatus(mockedState)).toEqual(status);
  });

  it('should return start time', () => {
    expect(Selectors.getStartTime(mockedState)).toEqual(startTime);
  });

  it('should return remained time', () => {
    expect(Selectors.getRemainedTime(mockedState)).toEqual(remainedTime);
  });
});
