import { combineReducers } from 'redux';

import stopwatchReducer from 'redux/clock/stopwatch';
import tabsReducer from 'redux/clock/tabs';

const clockReducer = combineReducers({
  tabs: tabsReducer,
  stopwatch: stopwatchReducer,
});

export default clockReducer;
