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

  let totalTickDifference = null;
  let lapTickDifference = null;

  let isStopwatchStopped = false;
  let isLapActionHappened = false;

  let timeSyncronized = true;

  while (yield take(channel)) {
    while (true) {
      let actionStartTime = performance.now();

      const {
        stopAction,
        setLapAction,
        resetAction,
        totalTickAction,
        lapTickAction,
      } = yield race({
        stopAction: take(ActionTypes.STOP),
        setLapAction: take(ActionTypes.SET_LAP_TIME),
        resetAction: take(ActionTypes.RESET),
        totalTickAction: delay(
          totalTickDifference
            ? totalTickDifference > 0
              ? totalTickDifference
              : 1000 + totalTickDifference
            : 1000,
        ),
        lapTickAction: delay(
          lapTickDifference
            ? lapTickDifference > 0
              ? lapTickDifference
              : 1000 + lapTickDifference
            : 1000,
        ),
      });

      let actionDuration = Math.abs(performance.now() - actionStartTime);
      let timeLeft = 1000 - actionDuration;

      let totalTime = yield select(Selectors.getTotalTime);
      let lapTime = yield select(Selectors.getLapTime);

      if (totalTickAction) {
        lapTickDifference = null;
        totalTickDifference = null;

        yield put(ActionCreators.totalTick(totalTime + 1000));

        if (isLapActionHappened) {
          isLapActionHappened = false;
          yield put(ActionCreators.updateLapTime(actionDuration));
          lapTickDifference = timeLeft;
        } else if (timeSyncronized) {
          yield put(ActionCreators.lapTick(lapTime + 1000));
        } else {
          yield put(ActionCreators.updateLapTime(actionDuration));
          lapTickDifference = timeLeft;
        }
      } else if (lapTickAction) {
        lapTickDifference = null;
        yield put(ActionCreators.updateTotalTime(actionDuration));
        totalTickDifference = timeLeft;
        yield put(ActionCreators.lapTick(lapTime + 1000));
      } else if (setLapAction) {
        timeSyncronized = false;
        isLapActionHappened = true;

        yield put(ActionCreators.updateTotalTime(actionDuration));

        const totalTimeTmp = yield select(Selectors.getTotalTimeTmp);
        const lapTimeTmp = yield select(Selectors.getLapTimeTmp);

        const tmp =
          lapTimeTmp > 0
            ? lapTimeTmp + (totalTimeTmp - totalTime)
            : lapTime + (totalTimeTmp - totalTime);
        yield put(ActionCreators.updateLapHistory(totalTimeTmp, tmp));

        yield put(ActionCreators.lapTick(0));

        totalTickDifference = timeLeft;
      } else if (stopAction) {
        isStopwatchStopped = true;
        break;
      } else if (resetAction || stopAction) {
        break;
      }
    }
  }
}
