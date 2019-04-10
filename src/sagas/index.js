import { all, fork, take } from 'redux-saga/effects';

function* testSaga() {
  console.log('testSaga is running');
  const action = yield take('TEST_ACTION');
  console.log(action);
}

export default function* rootSaga() {
  yield all([fork(testSaga)]);
}
