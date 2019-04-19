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

  let timeSynchonized = true;

  while (yield take(channel)) {
    while (true) {
      const timeBeforeAction = performance.now();

      const {
        stopAction,
        setLapAction,
        tickAction,
        resetAction,
        totalTickAction,
        lapTickAction,
      } = yield race({
        stopAction: take(ActionTypes.STOP),
        setLapAction: take(ActionTypes.SET_LAP_TIME),
        resetAction: take(ActionTypes.RESET),
        totalTickAction: delay(totalTickDifference || 1000),
        lapTickAction: delay(lapTickDifference || 1000),
        tickAction: delay(1000),
      });

      let timeLeft = Math.abs(performance.now() - timeBeforeAction);
      // const diff = 1000 - (Date.now() - timeBeforeAction);

      let totalTime = yield select(Selectors.getTotalTime);
      let lapTime = yield select(Selectors.getLapTime);

      if (totalTickAction) {
        ///////////////////////
        ///////////////////////
        // debugger;
        lapTickDifference = null;
        totalTickDifference = null;
        // yield put(ActionCreators.totalTick(totalTime + 1000));
        yield put(
          ActionCreators.totalTick(totalTime + (1000 - (totalTime % 100))),
        );

        if (isLapActionHappened) {
          console.log('isLapActionHappened', isLapActionHappened);
          isLapActionHappened = false;
          timeLeft = timeLeft > 1000 ? 1000 : timeLeft;
          yield put(ActionCreators.updateLapTime(timeLeft));

          lapTickDifference = 1000 - timeLeft;
          // debugger;
        } else if (timeSynchonized) {
          // yield put(ActionCreators.lapTick(lapTime + 1000));
          yield put(
            ActionCreators.lapTick(lapTime + (1000 - (totalTime % 100))),
          );
        } else {
          timeLeft = timeLeft > 1000 ? 1000 : timeLeft;
          yield put(ActionCreators.updateLapTime(timeLeft));

          lapTickDifference = 1000 - timeLeft;
        }
        // if (isStopwatchStopped | isLapActionHappened) {
        //   lapTickDifference = 1000 - (Date.now() - timeBeforeAction);
        //   isStopwatchStopped = false;
        //   isLapActionHappened = false;
        // } else {
        //   yield put(ActionCreators.lapTick(lapTime + 1000));
        // }

        // yield put(ActionCreators.lapTick(lapTime + 1000));
        ///////////////////////
        ///////////////////////
      } else if (lapTickAction) {
        ///////////////////////
        ///////////////////////
        // totalTickDifference = 1000 - (Date.now() - timeBeforeAction);
        // console.log('lapTick');
        lapTickDifference = null;
        timeLeft = timeLeft > 1000 ? 1000 : timeLeft;
        debugger;
        yield put(ActionCreators.updateTotalTime(timeLeft));

        totalTime = totalTime + timeLeft;

        totalTickDifference = totalTime % 100;
        console.log('totalTickDifference', totalTickDifference);
        // totalTickDifference = 1000 - (performance.now() - timeBeforeAction);

        // yield put(ActionCreators.updateTotalTime(lapTickDifference));
        debugger;
        yield put(ActionCreators.lapTick(lapTime + (1000 - (lapTime % 100))));
        ///////////////////////
        ///////////////////////
        ///////////////////////
      } else if (setLapAction) {
        ///////////////////////
        ///////////////////////
        ///////////////////////
        console.log('lapAction');
        timeSynchonized = false;
        isLapActionHappened = true;

        timeLeft = timeLeft > 1000 ? 1000 : timeLeft;
        debugger;
        // debugger;
        yield put(ActionCreators.updateTotalTime(timeLeft));
        yield put(ActionCreators.updateLapHistory(timeLeft));

        yield put(ActionCreators.lapTick(0));

        totalTime = totalTime + timeLeft;
        // const lapTime = yield select(Selectors.getLapTime);

        totalTickDifference = totalTime % 100;
        // lapTickDifference = lapTime % 100;
        // lapTickDifference = 1000 - timeLeft;
        ///////////////////////
        ///////////////////////
        ///////////////////////
      } else if (stopAction) {
        ///////////////////////
        ///////////////////////
        ///////////////////////
        totalTickDifference = 1000 - (performance.now() - timeBeforeAction);
        isStopwatchStopped = true;
        break;
        ///////////////////////
        ///////////////////////
        ///////////////////////
      } else if (resetAction || stopAction) {
        break;
      }

      // if (tickAction) {
      //   yield put(ActionCreators.totalTick(totalTime + 1));
      //   yield put(ActionCreators.lapTick(lapTime + 1));
      // } else if (resetAction || stopAction) {
      //   break;
      // }
    }
  }
}
