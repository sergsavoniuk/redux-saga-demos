import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import stopwatchReducer from 'redux/clock/stopwatch';
import authReducer from 'redux/auth';

function rootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    clockApp: combineReducers({
      stopwatch: stopwatchReducer,
    }),
  });
}

export default rootReducer;
