import { take, fork, call, put, cancel } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import {
  LOGIN_USER,
  LOGIN_USER_FAILURE,
  LOGOUT,
  loginSuccess,
  loginFailure,
} from 'redux/auth';

function* authorizeUser(username) {
  try {
    yield call([localStorage, localStorage.setItem], 'username', username);
    yield put(loginSuccess(username));
    yield put(push('/'));
  } catch (error) {
    yield put(loginFailure({ error, message: `${username} not found` }));
  }
}

export default function* watchAuthorization() {
  while (true) {
    const { payload } = yield take(LOGIN_USER);

    const task = yield fork(authorizeUser, payload.username);

    const action = yield take([LOGIN_USER_FAILURE, LOGOUT]);
    if (action.type === LOGOUT) {
      yield cancel(task);
      yield put(push('/auth'));
    }
    yield call([localStorage, localStorage.removeItem], 'username');
  }
}
