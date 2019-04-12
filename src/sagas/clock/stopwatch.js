import {
  actionChannel,
  delay,
  call,
  race,
  put,
  take,
  select,
} from 'redux-saga/effects';

import {
  START,
  STOP,
  TOTAL_TICK,
  LAP_TICK,
  RESET,
  totalTick,
  lapTick,
  stop,
  getLapsHistory,
  getTotalTime,
  getLapTime,
  setLapTime,
} from 'redux/clock/stopwatch';
import { SET_LAP_TIME } from '../../redux/clock/stopwatch';

export default function* watchStopwatch() {
  const channel = yield actionChannel(START);
  while (yield take(channel)) {
    while (true) {
      const { stopAction, setLapAction, resetAction, tickAction } = yield race({
        stopAction: take(STOP),
        setLapAction: take(SET_LAP_TIME),
        resetAction: take(RESET),
        tickAction: delay(1000),
      });

      const totalTime = yield select(getTotalTime);
      const lapTime = yield select(getLapTime);

      if (tickAction) {
        yield put(totalTick(totalTime + 1));
        yield put(lapTick(lapTime + 1));
      } else if (resetAction || stopAction) {
        // yield put(stop(lapTime));
        break;
      }
    }
  }
}
