// Action types

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const LOGOUT = 'LOGOUT';

// Actions

export function login(username) {
  return {
    type: LOGIN_USER,
    payload: {
      username,
    },
  };
}

export function loginSuccess(username) {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      username,
    },
  };
}

export function loginFailure({ error, message }) {
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      error,
      message,
    },
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

const initialState = {
  username: null,
  isAuthenticated: false,
  error: null,
  loading: false,
};

// Reducer

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER: {
      return {
        ...state,
        loading: true,
      };
    }
    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        username: action.payload.username,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    }
    case LOGIN_USER_FAILURE: {
      return {
        ...state,
        error: action.payload.message,
        isAuthenticated: false,
        loading: false,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        ...initialState,
      };
    }
    default:
      return state;
  }
}

// Selectors

export const getUsername = state => state.auth.username;
export const getIsAuthenticated = state => state.auth.isAuthenticated;
export const getErrorMessage = state => state.auth.error;
export const getLoadingStatus = state => state.auth.loading;
