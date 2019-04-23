import {
  actionChannel,
  delay,
  race,
  put,
  take,
  select,
} from 'redux-saga/effects';

import { ActionTypes, ActionCreators, Selectors } from 'redux/clock/timer';
import { ActionCreators as NotificationActionCreators } from 'redux/notifications';
import { TimerStatuses } from 'constants/clock/timerStatuses';

export default function* watchTimer() {
  const channel = yield actionChannel(ActionTypes.START);

  let tickDifference = null;

  while (yield take(channel)) {
    const status = yield select(Selectors.getStatus);
    const remainedTime = yield select(Selectors.getRemainedTime);

    if (remainedTime !== 0 && status === TimerStatuses.RUNNING) {
      while (true) {
        const remainedTime = yield select(Selectors.getRemainedTime);

        if (remainedTime === 0) {
          yield put(ActionCreators.finish());
          yield put(
            NotificationActionCreators.addNotificationToQueue({
              title: 'Timer',
              body: 'The time is up!',
              entityName: 'TIMER',
            }),
          );
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
          break;
        }
      }
    } else {
      yield put(ActionCreators.finish());
    }
  }
}
