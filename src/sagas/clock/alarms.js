import { delay, race, put, take, select, call } from 'redux-saga/effects';
import { addDays, addMinutes } from 'date-fns';

import { ActionTypes, Selectors } from 'redux/clock/alarms';
import { ActionCreators as NotificationActionCreators } from 'redux/notifications';

export function create(Class, ...args) {
  return call(() => new Class(...args));
}

export default function* watchAlarms(alarmId) {
  while (true) {
    yield take(`${ActionTypes.SET_ALARM}.${alarmId}`);

    const startDate = yield create(Date);

    const alarmTimeInMinutes = yield select(Selectors.getAlarmTime, alarmId);
    const alarmDays = (yield select(Selectors.getSelectedDays, alarmId)).sort(
      (a, b) => a - b,
    );

    const calculateTimeUntilTheNextAlarm = yield call(calculateTime, {
      startDate,
      alarmDays,
      alarmTimeInMinutes,
    });

    let time = yield call(calculateTimeUntilTheNextAlarm);

    while (true) {
      const { alarmRang } = yield race({
        alarmRang: delay(time),
        removeAlarm: take(`${ActionTypes.SET_ALARM}.${alarmId}`),
      });

      if (alarmRang) {
        yield put(
          NotificationActionCreators.addNotificationToQueue({
            title: 'Alarms',
            body: 'The alarm went off!',
          }),
        );
        time = yield call(calculateTimeUntilTheNextAlarm);
      } else {
        break;
      }
    }
  }
}

// Helpers

function calculateTime({ startDate, alarmDays, alarmTimeInMinutes }) {
  const day = startDate.getDay() || 7;
  let nextDay = day,
    nextDayIndex = -1;

  let time, differenceInDays, nextAlarmDate;

  return function() {
    let currentDay = nextDay;

    [nextDay, nextDayIndex] = findNextDay({
      alarmDays,
      currentDay,
      offset: nextDayIndex + 1,
    });

    startDate = nextAlarmDate || startDate;

    if (nextDay === currentDay) {
      if (timeHasAlreadyPassed(startDate, alarmTimeInMinutes)) {
        [nextDay, nextDayIndex] = findNextDay({
          alarmDays,
          currentDay,
          offset: nextDayIndex + 1,
        });

        if (nextDay > currentDay) {
          differenceInDays = nextDay - currentDay;
        } else {
          differenceInDays = 7;
        }
      } else {
        differenceInDays = time !== undefined ? 7 : 0;
      }
    } else if (nextDay > currentDay) {
      differenceInDays = nextDay - currentDay;
    } else if (nextDay < day) {
      differenceInDays = 7 - currentDay + nextDay;
    }

    nextAlarmDate = calculateNextAlarmDate({
      startDate,
      differenceInDays,
      alarmTimeInMinutes,
    });

    time = calculateTimeUntilTheNextAlarmInMillisecs(startDate, nextAlarmDate);

    return time;
  };
}

function timeHasAlreadyPassed(startDate, timeInMinutes) {
  return startDate - buildDate(startDate).setMinutes(timeInMinutes) > 0;
}

function calculateNextAlarmDate({
  startDate,
  differenceInDays,
  alarmTimeInMinutes,
}) {
  return addMinutes(
    addDays(buildDate(startDate), differenceInDays),
    alarmTimeInMinutes,
  );
}

function calculateTimeUntilTheNextAlarmInMillisecs(startDate, nextAlarmDate) {
  return nextAlarmDate - startDate;
}

function findNextDay(options) {
  const nextDayIndex = findNextDayIndex(options);
  return [options.alarmDays[nextDayIndex], nextDayIndex];
}

function findNextDayIndex({ alarmDays, currentDay, offset }) {
  let nextDayIndex = -1;

  for (let i = offset; i < alarmDays.length; ++i) {
    if (alarmDays[i] >= currentDay) {
      nextDayIndex = i;
      break;
    }
  }

  return nextDayIndex > -1 ? nextDayIndex : 0;
}

function buildDate(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
