import { delay, race, put, take, select } from 'redux-saga/effects';
import { addDays, addMinutes } from 'date-fns';

import { ActionTypes, ActionCreators, Selectors } from 'redux/clock/alarms';

export default function* watchAlarms(alarmId) {
  while (true) {
    yield take(`${ActionTypes.SET_ALARM}.${alarmId}`);
    const now = new Date();
    const day = now.getDay() || 7;
    const seconds =
      now.getHours() * 60 * 60 + now.getMinutes() * 60 + now.getSeconds();
    const alarmTime = yield select(Selectors.getAlarmTime, alarmId);
    const sortedSelectedDays = (yield select(
      Selectors.getSelectedDays,
      alarmId,
    )).sort((a, b) => a - b);
    debugger;

    let nextDayIndex = sortedSelectedDays.findIndex(
      selectedDay => selectedDay >= day,
    );
    nextDayIndex = nextDayIndex > -1 ? nextDayIndex : 0;
    let nextDay = sortedSelectedDays[nextDayIndex];
    debugger;
    let time;

    if (nextDay === day) {
      if (seconds > alarmTime * 60) {
        nextDay = sortedSelectedDays[nextDayIndex + 1] || sortedSelectedDays[0];
        nextDayIndex = sortedSelectedDays.findIndex(
          selectedDay => selectedDay === nextDay,
        );

        if (nextDay > day) {
          const diff = nextDay - day;
          const newDate = addMinutes(
            addDays(
              new Date(now.getFullYear(), now.getMonth(), now.getDate()),
              diff,
            ),
            alarmTime,
          );
          time = newDate - now;
        }
      } else {
        time = alarmTime * 60 - seconds;
      }
    } else if (nextDay > day) {
      const diff = nextDay - day;
      const newDate = addMinutes(
        addDays(
          new Date(now.getFullYear(), now.getMonth(), now.getDate()),
          diff,
        ),
        alarmTime,
      );
      time = newDate - now;
    } else if (nextDay < day) {
      const diff = 7 - day + nextDay;
      const newDate = addMinutes(
        addDays(
          new Date(now.getFullYear(), now.getMonth(), now.getDate()),
          diff,
        ),
        alarmTime,
      );
      time = newDate - now;
    }

    // debugger;
    while (true) {
      const { alarmRang } = yield race({
        // alarmRang: delay(time * 1000),
        alarmRang: delay(10000000),

        removeAlarm: take(`${ActionTypes.SET_ALARM}.${alarmId}`),
      });
      // debugger;
      if (alarmRang) {
        yield put(ActionCreators.setAlarmWentOff(alarmId, true));
        break;
      } else {
        break;
      }
    }
  }
}
