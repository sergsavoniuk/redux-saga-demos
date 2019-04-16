import { combineReducers } from 'redux';

import alarmsReducer from 'redux/clock/alarms';
import stopwatchReducer from 'redux/clock/stopwatch';
import timerReducer from 'redux/clock/timer';
import tabsReducer from 'redux/clock/tabs';

const clockReducer = combineReducers({
  tabs: tabsReducer,
  alarms: alarmsReducer,
  stopwatch: stopwatchReducer,
  timer: timerReducer,
});

export default clockReducer;
