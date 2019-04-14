import {
  actionChannel,
  delay,
  race,
  put,
  take,
  select,
} from 'redux-saga/effects';

import { ActionTypes, ActionCreators, Selectors } from 'redux/clock/timer';

export default function* watchTimer() {
  const channel = yield actionChannel(ActionTypes.START);

  while (yield take(channel)) {
    while (true) {
      const { stopAction, resetAction, tickAction } = yield race({
        stopAction: take(ActionTypes.STOP),
        resetAction: take(ActionTypes.RESET),
        tickAction: delay(1000),
      });

      const remainedTime = yield select(Selectors.getRemainedTime);

      if (tickAction) {
        yield put(ActionCreators.tick(remainedTime - 1));
      } else if (resetAction || stopAction) {
        break;
      }
    }
  }
}
