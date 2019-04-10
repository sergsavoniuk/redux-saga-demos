import { combineReducers } from 'redux';

function testReducer(state = 'test', action) {
  return state;
}

export default function rootReducer() {
  return combineReducers({
    test: testReducer,
  });
}
