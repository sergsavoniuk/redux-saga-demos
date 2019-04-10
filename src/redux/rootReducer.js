import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import authReducer from 'redux/auth';

function rootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    auth: authReducer,
  });
}

export default rootReducer;
