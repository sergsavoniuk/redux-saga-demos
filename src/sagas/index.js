import { all, fork } from 'redux-saga/effects';

import watchAuthorization from 'sagas/auth';
import watchStopwatch from 'sagas/clock/stopwatch';
import watchTimer from 'sagas/clock/timer';
import watchAlarms from './clock/alarms';
import cardGameWatcher from './cardGame';

export default function* rootSaga() {
  yield all([
    fork(watchAuthorization),
    fork(watchAlarms, 1),
    fork(watchAlarms, 2),
    fork(watchAlarms, 3),
    fork(watchAlarms, 4),
    fork(watchStopwatch),
    fork(watchTimer),
    fork(cardGameWatcher),
  ]);
}
