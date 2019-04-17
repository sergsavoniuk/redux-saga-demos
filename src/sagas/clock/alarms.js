import { delay, race, put, take, select } from 'redux-saga/effects';

import { ActionTypes, ActionCreators, Selectors } from 'redux/clock/alarms';

export default function* watchAlarms(alarmId) {
  while (true) {
    yield take(`${ActionTypes.SET_ALARM}.${alarmId}`);
    const now = new Date();
    const day = now.getDay();
    const seconds =
      now.getHours() * 60 * 60 + now.getMinutes() * 60 + now.getSeconds();
    const alarmTime = yield select(Selectors.getAlarmTime, alarmId);
    const selectedDays = yield select(Selectors.getSelectedDays, alarmId);
    // debugger;
    const nextDayIndex = selectedDays.findIndex(
      selectedDay => day >= selectedDay,
    );
    let nextDay = selectedDays[nextDayIndex];

    let time;

    if (nextDay === day) {
      if (seconds > alarmTime * 60) {
        nextDay = nextDay[nextDayIndex + 1] || nextDay[0];
      } else {
        time = alarmTime * 60 - seconds;
      }
    } else if (nextDay > day) {
    }

    // debugger;
    while (true) {
      const { alarmRang } = yield race({
        alarmRang: delay(time * 1000),
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
