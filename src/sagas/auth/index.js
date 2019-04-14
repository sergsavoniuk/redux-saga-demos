import { take, fork, call, put, cancel } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { ActionTypes, ActionCreators } from 'redux/auth';

function* authorizeUser(username) {
  try {
    yield call([localStorage, localStorage.setItem], 'username', username);
    yield put(ActionCreators.loginSuccess(username));
    yield put(push('/'));
  } catch (error) {
    yield put(
      ActionCreators.loginFailure({ error, message: `${username} not found` }),
    );
  }
}

export default function* watchAuthorization() {
  while (true) {
    const { payload } = yield take(ActionTypes.LOGIN_USER);

    const task = yield fork(authorizeUser, payload.username);

    const action = yield take([
      ActionTypes.LOGIN_USER_FAILURE,
      ActionTypes.LOGOUT,
    ]);
    if (action.type === ActionTypes.LOGOUT) {
      yield cancel(task);
      yield put(push('/auth'));
    }
    yield call([localStorage, localStorage.removeItem], 'username');
  }
}
