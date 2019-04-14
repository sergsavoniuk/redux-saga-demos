import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import clockReducer from 'redux/clock';
import authReducer from 'redux/auth';

function rootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    clockApp: clockReducer,
  });
}

export default rootReducer;
