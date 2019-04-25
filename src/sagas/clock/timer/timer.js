import { call, all, delay, race, put, take, select } from 'redux-saga/effects';

import { ActionTypes, ActionCreators, Selectors } from 'redux/clock/timer';
import { ActionCreators as NotificationActionCreators } from 'redux/notifications';
import { TimerStatuses } from 'constants/clock/timerStatuses';

export function* timerWorkerSaga(tickDifference) {
  while (true) {
    const remainedTime = yield select(Selectors.getRemainedTime);

    if (remainedTime === 0) {
      yield all([
        put(ActionCreators.finish()),
        put(
          NotificationActionCreators.addNotificationToQueue({
            title: 'Timer',
            body: 'The time is up!',
          }),
        ),
      ]);
      break;
    }

    const timeBeforeAction = Date.now();

    const { stopAction, resetAction, tickAction } = yield race({
      stopAction: take(ActionTypes.STOP),
      resetAction: take(ActionTypes.RESET),
      tickAction: delay(tickDifference || 1000),
    });

    if (tickAction) {
      yield put(ActionCreators.tick(remainedTime - 1));
      tickDifference = null;
    } else if (resetAction || stopAction) {
      // if stop action happened, calculate the time for the next tick
      if (stopAction) {
        tickDifference = 1000 - (Date.now() - timeBeforeAction);
      }
      return tickDifference;
    }
  }
}

export default function* watchTimer() {
  let tickDifference = null;

  while (yield take(ActionTypes.START)) {
    const [status, remainedTime] = yield all([
      select(Selectors.getStatus),
      select(Selectors.getRemainedTime),
    ]);

    if (remainedTime !== 0 && status === TimerStatuses.RUNNING) {
      tickDifference = yield call(timerWorkerSaga, tickDifference);
    } else {
      yield all([
        put(ActionCreators.finish()),
        put(
          NotificationActionCreators.addNotificationToQueue({
            title: 'Timer',
            body: 'The time is up!',
          }),
        ),
      ]);
    }
  }
}
