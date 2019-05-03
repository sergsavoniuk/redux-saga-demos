import { call } from 'redux-saga/effects';
import { addDays, addMinutes } from 'date-fns';

export function create(Class, ...args) {
  return call(() => new Class(...args));
}

export function calculateTime({ startDate, alarmDays, alarmTimeInMinutes }) {
  const day = startDate.getDay() || 7;
  let nextDay = day,
    nextDayIndex = -1;

  let time, differenceInDays, nextAlarmDate;

  return () => {
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

export function timeHasAlreadyPassed(startDate, timeInMinutes) {
  return startDate - buildDate(startDate).setMinutes(timeInMinutes) > 0;
}

export function calculateNextAlarmDate({
  startDate,
  differenceInDays,
  alarmTimeInMinutes,
}) {
  return addMinutes(
    addDays(buildDate(startDate), differenceInDays),
    alarmTimeInMinutes,
  );
}

export function calculateTimeUntilTheNextAlarmInMillisecs(
  startDate,
  nextAlarmDate,
) {
  return nextAlarmDate - startDate;
}

export function findNextDay(options) {
  const nextDayIndex = findNextDayIndex(options);
  return [options.alarmDays[nextDayIndex], nextDayIndex];
}

export function findNextDayIndex({ alarmDays, currentDay, offset }) {
  let nextDayIndex = -1;

  for (let i = offset; i < alarmDays.length; ++i) {
    if (alarmDays[i] >= currentDay) {
      nextDayIndex = i;
      break;
    }
  }

  return nextDayIndex > -1 ? nextDayIndex : 0;
}

export function buildDate(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
