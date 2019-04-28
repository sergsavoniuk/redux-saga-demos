import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import clockReducer from 'redux/clock';
import authReducer from 'redux/auth';
import notificationsReducer from 'redux/notifications';
import cardGameReducer from 'redux/cardGame';

function rootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    clockApp: clockReducer,
    notifications: notificationsReducer,
    cardGame: cardGameReducer,
  });
}

export default rootReducer;
