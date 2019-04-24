// Action types
export const ActionTypes = {
  LOGIN_USER: '@auth/LOGIN_USER',
  LOGIN_USER_SUCCESS: '@auth/LOGIN_USER_SUCCESS',
  LOGIN_USER_FAILURE: '@auth/LOGIN_USER_FAILURE',
  LOGOUT: '@auth/LOGOUT',
};

// Actions creators
export const ActionCreators = {
  login(username) {
    return {
      type: ActionTypes.LOGIN_USER,
      payload: {
        username,
      },
    };
  },

  loginSuccess(username) {
    return {
      type: ActionTypes.LOGIN_USER_SUCCESS,
      payload: {
        username,
      },
    };
  },

  loginFailure({ error, message }) {
    return {
      type: ActionTypes.LOGIN_USER_FAILURE,
      payload: {
        error,
        message,
      },
    };
  },

  logout() {
    return {
      type: ActionTypes.LOGOUT,
    };
  },
};

const initialState = {
  username: null,
  isAuthenticated: false,
  error: null,
  loading: false,
};

// Reducer

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOGIN_USER: {
      return {
        ...state,
        loading: true,
      };
    }
    case ActionTypes.LOGIN_USER_SUCCESS: {
      return {
        ...state,
        username: action.payload.username,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    }
    case ActionTypes.LOGIN_USER_FAILURE: {
      return {
        ...state,
        error: action.payload.message,
        isAuthenticated: false,
        loading: false,
      };
    }
    case ActionTypes.LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
}

// Selectors
export const Selectors = {
  getUsername(state) {
    return state.auth.username;
  },

  getIsAuthenticated(state) {
    return state.auth.isAuthenticated;
  },

  getErrorMessage(state) {
    return state.auth.error;
  },

  getLoadingStatus(state) {
    return state.auth.loading;
  },
};
