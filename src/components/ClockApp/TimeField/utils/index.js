import { addSeconds, addMinutes } from 'date-fns';

const date = new Date('01 Jan 1970 00:00:00');

export function secsToTime(timeInSecs) {
  return addSeconds(date, timeInSecs + 1);
}

export function init(startTime) {
  const datetime = addMinutes(date, startTime);
  return {
    hours: String(datetime.getHours()).padStart(2, '0'),
    minutes: String(datetime.getMinutes()).padStart(2, '0'),
    seconds: String(datetime.getSeconds()).padStart(2, '0'),
  };
}

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
