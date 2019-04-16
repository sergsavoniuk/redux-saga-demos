import {
  actionChannel,
  delay,
  race,
  put,
  take,
  select,
} from 'redux-saga/effects';

import { ActionTypes, ActionCreators, Selectors } from 'redux/clock/stopwatch';

export default function* watchStopwatch() {
  const channel = yield actionChannel(ActionTypes.START);
  while (yield take(channel)) {
    while (true) {
      const { stopAction, resetAction, tickAction } = yield race({
        stopAction: take(ActionTypes.STOP),
        setLapAction: take(ActionTypes.SET_LAP_TIME),
        resetAction: take(ActionTypes.RESET),
        tickAction: delay(1000),
      });

      const totalTime = yield select(Selectors.getTotalTime);
      const lapTime = yield select(Selectors.getLapTime);

      if (tickAction) {
        yield put(ActionCreators.totalTick(totalTime + 1));
        yield put(ActionCreators.lapTick(lapTime + 1));
      } else if (resetAction || stopAction) {
        break;
      }
    }
  }
}
