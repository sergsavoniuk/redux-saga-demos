import { combineReducers } from 'redux';

import stopwatchReducer from 'redux/clock/stopwatch';
import timerReducer from 'redux/clock/timer';
import tabsReducer from 'redux/clock/tabs';

const clockReducer = combineReducers({
  tabs: tabsReducer,
  stopwatch: stopwatchReducer,
  timer: timerReducer,
});

export default clockReducer;
