import { all, fork } from 'redux-saga/effects';

import watchAuthorization from 'sagas/auth';
import watchStopwatch from 'sagas/clock/stopwatch';

export default function* rootSaga() {
  yield all([fork(watchAuthorization), fork(watchStopwatch)]);
}
