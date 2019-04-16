// Action types
export const ActionTypes = {
  ADD_ALARM: 'ADD_ALARM',
  SET_ALARM: 'SET_ALARM',
};

// Action creators
export const ActionCreators = {};

const initialState = {
  alarms: {},
};

// Reducer
export default function alarmsReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

// Selectors
