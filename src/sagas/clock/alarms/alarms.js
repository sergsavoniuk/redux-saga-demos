import { delay, race, put, take, select, call, all } from 'redux-saga/effects';

import { calculateTime, create } from './utils';
import { ActionTypes, Selectors } from 'redux/clock/alarms';
import { ActionCreators as NotificationActionCreators } from 'redux/notifications';

export function* alarmsWorkerSaga({
  alarmId,
  meta: { startDate, alarmTimeInMinutes, alarmDays },
}) {
  const calculateTimeUntilTheNextAlarm = yield call(calculateTime, {
    startDate,
    alarmDays: alarmDays.sort((a, b) => a - b),
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

export default function* watchAlarms(alarmId) {
  while (true) {
    yield take(`${ActionTypes.SET_ALARM}.${alarmId}`);

    const startDate = yield create(Date);

    const [alarmTimeInMinutes, alarmDays] = yield all([
      select(Selectors.getAlarmTime, alarmId),
      select(Selectors.getSelectedDays, alarmId),
    ]);

    yield call(alarmsWorkerSaga, {
      alarmId,
      meta: { startDate, alarmTimeInMinutes, alarmDays },
    });
  }
}
