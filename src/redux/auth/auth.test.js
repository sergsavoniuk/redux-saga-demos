import authReducer, { ActionTypes, ActionCreators, Selectors } from './auth';

describe('Auth Action Creators', () => {
  it('should create login action', () => {
    const username = 'test';
    const expectedAction = {
      type: ActionTypes.LOGIN_USER,
      payload: {
        username,
      },
    };

    expect(ActionCreators.login(username)).toEqual(expectedAction);
  });

  it('should create login success action', () => {
    const username = 'test';
    const expectedAction = {
      type: ActionTypes.LOGIN_USER_SUCCESS,
      payload: {
        username,
      },
    };

    expect(ActionCreators.loginSuccess(username)).toEqual(expectedAction);
  });

  it('should create login failure action', () => {
    const message = 'Login failure';
    const expectedAction = {
      type: ActionTypes.LOGIN_USER_FAILURE,
      payload: {
        error: null,
        message,
      },
    };

    expect(ActionCreators.loginFailure({ error: null, message })).toEqual(
      expectedAction,
    );
  });

  it('should create logout action', () => {
    const expectedAction = {
      type: ActionTypes.LOGOUT,
    };
    expect(ActionCreators.logout()).toEqual(expectedAction);
  });
});

describe('Auth Reducer', () => {
  const initialState = {
    username: null,
    isAuthenticated: false,
    error: null,
    loading: false,
  };

  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle LOGIN_USER action', () => {
    const username = 'test';
    expect(authReducer(initialState, ActionCreators.login(username))).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should handle LOGIN_USER_SUCCESS action', () => {
    const username = 'test';
    expect(
      authReducer(initialState, ActionCreators.loginSuccess(username)),
    ).toEqual({
      ...initialState,
      username,
      isAuthenticated: true,
      loading: false,
      error: null,
    });
  });

  it('should handle LOGIN_USER_FAILURE action', () => {
    const message = 'Login failure';
    expect(
      authReducer(initialState, ActionCreators.loginFailure({ message })),
    ).toEqual({
      ...initialState,
      isAuthenticated: false,
      loading: false,
      error: message,
    });
  });

  it('should handle LOGOUT action', () => {
    expect(authReducer(initialState, ActionCreators.logout())).toEqual(
      initialState,
    );
  });
});

describe('Auth Selectors', () => {
  const authState = {
    username: null,
    isAuthenticated: false,
    error: null,
    loading: false,
  };
  const mockedState = {
    auth: authState,
  };

  it('should return username', () => {
    expect(Selectors.getUsername(mockedState)).toBe(authState.username);
  });

  it('should return isAuthenticated flag', () => {
    expect(Selectors.getIsAuthenticated(mockedState)).toBe(
      authState.isAuthenticated,
    );
  });

  it('should return error message', () => {
    expect(Selectors.getErrorMessage(mockedState)).toBe(authState.error);
  });

  it('should return loading flag', () => {
    expect(Selectors.getLoadingStatus(mockedState)).toBe(authState.loading);
  });
});
