import {
  actionChannel,
  delay,
  race,
  put,
  take,
  select,
} from 'redux-saga/effects';

import { ActionTypes, ActionCreators, Selectors } from 'redux/clock/timer';
import { TimerStatuses } from 'constants/clock/timerStatuses';

export default function* watchTimer() {
  const channel = yield actionChannel(ActionTypes.START);

  while (yield take(channel)) {
    const status = yield select(Selectors.getStatus);
    const remainedTime = yield select(Selectors.getRemainedTime);

    if (remainedTime !== 0 && status === TimerStatuses.RUNNING) {
      while (true) {
        const remainedTime = yield select(Selectors.getRemainedTime);

        if (remainedTime === 0) {
          yield put(ActionCreators.finish());
          break;
        }

        const { stopAction, resetAction, tickAction } = yield race({
          stopAction: take(ActionTypes.STOP),
          resetAction: take(ActionTypes.RESET),
          tickAction: delay(1000),
        });

        if (tickAction) {
          yield put(ActionCreators.tick(remainedTime - 1));
        } else if (resetAction || stopAction) {
          break;
        }
      }
    } else {
      yield put(ActionCreators.finish());
    }
  }
}
