import { createMockTask, cloneableGenerator } from '@redux-saga/testing-utils';
import { push } from 'connected-react-router';
import { take, fork, call, put, cancel } from 'redux-saga/effects';

import watchAuthorization, { authorizeUser } from './auth';
import { ActionTypes, ActionCreators } from 'redux/auth';

describe('Auth - test authorization flow', () => {
  const generator = cloneableGenerator(watchAuthorization)();
  const mockTask = createMockTask();

  it('waits for login action', () => {
    const expectedTakeYield = take(ActionTypes.LOGIN_USER);
    expect(generator.next().value).toEqual(expectedTakeYield);
  });

  it('forks the authorize user service', () => {
    const username = 'testUser';
    const mockedAction = ActionCreators.login(username);
    const expectedForkYield = fork(authorizeUser, username);
    expect(generator.next(mockedAction).value).toEqual(expectedForkYield);
  });

  it('waits for logout or login failure action', () => {
    const expectedTakeYield = take([
      ActionTypes.LOGIN_USER_FAILURE,
      ActionTypes.LOGOUT,
    ]);
    expect(generator.next(mockTask).value).toEqual(expectedTakeYield);
  });

  it('logout action', () => {
    const cloneGenerator = generator.clone();

    const expectedCancelYield = cancel(mockTask);
    expect(cloneGenerator.next({ type: ActionTypes.LOGOUT }).value).toEqual(
      expectedCancelYield,
    );

    const expectedPutYield = put(push('/auth'));
    expect(cloneGenerator.next().value).toEqual(expectedPutYield);

    const expectedCallYield = call(
      [localStorage, localStorage.removeItem],
      'username',
    );
    expect(cloneGenerator.next().value).toEqual(expectedCallYield);
  });

  it('login failure action', () => {
    const cloneGenerator = generator.clone();

    const expectedCallYield = call(
      [localStorage, localStorage.removeItem],
      'username',
    );
    expect(
      cloneGenerator.next({ type: ActionTypes.LOGIN_USER_FAILURE }).value,
    ).toEqual(expectedCallYield);
  });
});

describe('Auth - test authorize user service', () => {
  const username = 'testUser';
  const generator = cloneableGenerator(authorizeUser)(username);

  it('perform user authorization', () => {
    const expectedCallYield = call(
      [localStorage, localStorage.setItem],
      'username',
      username,
    );
    expect(generator.next().value).toEqual(expectedCallYield);
  });

  it('successful user authorization', () => {
    const cloneGenerator = generator.clone();
    const expectedPutYield = [
      put(ActionCreators.loginSuccess(username)),
      put(push('/')),
    ];
    expect(cloneGenerator.next().value).toEqual(expectedPutYield);
  });

  it('failure user authorization', () => {
    const cloneGenerator = generator.clone();
    const error = new Error('Authorization Error');
    const expectedPutYield = put(
      ActionCreators.loginFailure({ error, message: `${username} not found` }),
    );

    expect(cloneGenerator.throw(error).value).toEqual(expectedPutYield);
  });
});
