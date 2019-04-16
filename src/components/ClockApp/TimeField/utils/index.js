const ActionTypes = {
  SET_HOURS: 'SET_HOURS',
  SET_MINUTES: 'SET_MINUTES',
  SET_SECONDS: 'SET_SECONDS',
};

export function reducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_HOURS:
    case ActionTypes.SET_MINUTES:
    case ActionTypes.SET_SECONDS: {
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    }
    default:
      return state;
  }
}
