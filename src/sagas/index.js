import { all, fork } from 'redux-saga/effects';

import watchAuthorization from 'sagas/auth';

export default function* rootSaga() {
  yield all([fork(watchAuthorization)]);
}
