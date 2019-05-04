import { cloneableGenerator } from '@redux-saga/testing-utils';
import { delay, race, put, take, select, call, all } from 'redux-saga/effects';
import { addDays, addMinutes } from 'date-fns';

import watchAlarms, { alarmsWorkerSaga } from './alarms';
import {
  create,
  calculateTime,
  timeHasAlreadyPassed,
  calculateNextAlarmDate,
  calculateTimeUntilTheNextAlarmInMillisecs,
  findNextDay,
  findNextDayIndex,
  buildDate,
} from './utils';
import { ActionTypes, Selectors } from 'redux/clock/alarms';
import { ActionCreators as NotificationActionCreators } from 'redux/notifications';

describe('Alarms - testing common flow', () => {
  const alarmId = 1;
  const generator = cloneableGenerator(watchAlarms)(alarmId);
  const startDate = new Date();

  it('waits for SET_ALARM action', () => {
    const expectedTakeYield = take(`${ActionTypes.SET_ALARM}.${alarmId}`);
    expect(generator.next().value).toEqual(expectedTakeYield);
  });

  it('select alarm day and time, then calculate time for the next alarm', () => {
    const expectedCallYield = create(Date);
    expect(JSON.stringify(generator.next().value)).toEqual(
      JSON.stringify(expectedCallYield),
    );

    const expectedAllSelectYield = all([
      select(Selectors.getAlarmTime, alarmId),
      select(Selectors.getSelectedDays, alarmId),
    ]);
    expect(generator.next(startDate).value).toEqual(expectedAllSelectYield);
  });

  it('run the alarms worker saga', () => {
    const alarmTimeInMinutes = addMinutes(startDate, 60);
    const alarmDays = [0, 1];
    const expectedCallWorkerSagaYield = call(alarmsWorkerSaga, {
      alarmId,
      meta: { startDate, alarmTimeInMinutes, alarmDays },
    });
    expect(generator.next([alarmTimeInMinutes, alarmDays]).value).toEqual(
      expectedCallWorkerSagaYield,
    );
  });
});

describe('Alarms - testing worker saga', () => {
  const params = {
    alarmId: 1,
    meta: {
      startDate: new Date(),
      alarmTimeInMinutes: 60,
      alarmDays: [4, 2, 1],
    },
  };
  const generator = cloneableGenerator(alarmsWorkerSaga)(params);
  const calculateTimeUntilTheNextAlarm = jest.fn();

  it('calculate the time for the next alarm', () => {
    const { startDate, alarmDays, alarmTimeInMinutes } = params.meta;
    const expectedCalculateTimeCallYield = call(calculateTime, {
      startDate,
      alarmDays: alarmDays.sort((a, b) => a - b),
      alarmTimeInMinutes,
    });
    expect(generator.next([alarmTimeInMinutes, alarmDays]).value).toEqual(
      expectedCalculateTimeCallYield,
    );

    const expectedCalculateTimeUntilTheNextAlarmCallYield = call(
      calculateTimeUntilTheNextAlarm,
    );
    expect(generator.next(calculateTimeUntilTheNextAlarm).value).toEqual(
      expectedCalculateTimeUntilTheNextAlarmCallYield,
    );
  });

  it('waits form rang or disable alarm', () => {
    const time = 100;
    const expectedRaceYield = race({
      alarmRang: delay(time),
      removeAlarm: take(`${ActionTypes.SET_ALARM}.${params.alarmId}`),
    });
    expect(generator.next(time).value).toEqual(expectedRaceYield);
  });

  it('disable alarm action has happened', () => {
    const cloneGenerator = generator.clone();
    expect(cloneGenerator.next({ alarmRang: false }).done).toBe(true);
  });

  it('rang alarm action has happened', () => {
    const cloneGenerator = generator.clone();

    const expectedPutYield = putLike(
      NotificationActionCreators.addNotificationToQueue({
        title: 'Alarms',
        body: 'The alarm went off!',
        mediaSrc: `${process.env.PUBLIC_URL}/audio/timer.mp3`,
      }),
    );
    expect(
      removeNotificationIdFromYieldedValue(
        cloneGenerator.next({ alarmRang: true }).value,
      ),
    ).toEqual(expectedPutYield);

    const expectedCalculateTimeUntilTheNextAlarmCallYield = call(
      calculateTimeUntilTheNextAlarm,
    );
    expect(cloneGenerator.next().value).toEqual(
      expectedCalculateTimeUntilTheNextAlarmCallYield,
    );
  });
});

describe('Alarms - testing util functions', () => {
  it('buildDate - should build date object without time based on another date object ', () => {
    const date = new Date();
    expect(buildDate(date)).toEqual(
      new Date(date.getFullYear(), date.getMonth(), date.getDate()),
    );
  });

  it('calculateTimeUntilTheNextAlarmInMillisecs - should calculate time until then next alarm in ms', () => {
    const startDate = new Date();
    const diff = 60;
    const nextAlarmDate = addMinutes(startDate, diff);
    expect(
      calculateTimeUntilTheNextAlarmInMillisecs(startDate, nextAlarmDate),
    ).toBe(diff * 60 * 1000);
  });

  it('timeHasAlreadyPassed - should check if difference between startDate and timeInMinutes more than 0', () => {
    const startDate = new Date();
    startDate.setHours(8);
    startDate.setMinutes(0);
    startDate.setSeconds(0);

    let timeInMinutes = 600; // 10:00
    expect(timeHasAlreadyPassed(startDate, timeInMinutes)).toBe(false);

    timeInMinutes = 360; // 6:00
    expect(timeHasAlreadyPassed(startDate, timeInMinutes)).toBe(true);
  });

  it('findNextDayIndex - should find the index of the next day', () => {
    const options = {
      alarmDays: [2, 3, 5, 7],
      currentDay: 4,
      offset: 0,
    };

    expect(findNextDayIndex(options)).toBe(2);

    // move cursor in alarmDays array to position 3
    options.offset = 3;
    expect(findNextDayIndex(options)).toBe(3);

    // move cursor in alarmDays array to position 4
    options.offset = 4;
    expect(findNextDayIndex(options)).toBe(0);
  });

  it('findNextDay - should find the next day', () => {
    const options = {
      alarmDays: [2, 3, 5, 7],
      currentDay: 4,
      offset: 0,
    };

    expect(findNextDay(options)).toEqual([5, 2]);

    // move cursor in alarmDays array to position 3
    options.offset = 3;
    expect(findNextDay(options)).toEqual([7, 3]);

    // move cursor in alarmDays array to position 4 (starts searching from the beginning of the array)
    options.offset = 4;
    expect(findNextDay(options)).toEqual([2, 0]);
  });

  it('calculateNextAlarmDate - should calculate the date of the next alarm', () => {
    const startDate = new Date();
    startDate.setHours(10);
    startDate.setMinutes(0);
    startDate.setSeconds(0);

    const differenceInDays = 2;
    const alarmTimeInMinutes = 720;

    const options = {
      startDate,
      differenceInDays,
      alarmTimeInMinutes,
    };

    expect(calculateNextAlarmDate(options)).toEqual(
      addMinutes(
        addDays(buildDate(startDate), differenceInDays),
        alarmTimeInMinutes,
      ),
    );
  });

  // it('calculateTime', () => {
  //   const startDate = new Date();
  //   startDate.setHours(10);
  //   startDate.setMinutes(0);
  //   startDate.setSeconds(0);
  //   const alarmDays = [2, 3, 5];
  //   const alarmTimeInMinutes = 360;

  //   const options = {
  //     startDate,
  //     alarmDays,
  //     alarmTimeInMinutes,
  //   };

  //   // const innerFunc = calculateTime(options);
  //   // jest.mock('../utils/calculateTime');
  //   // const mockFn = jest.fn();
  //   // calculateTime.mockImplementation(() => mockFn);
  //   // expect(calculateTime(options)).toEqual(mockFn);

  //   // expect(innerFunc()).toEqual(5000);
  // });
});

function putLike(action) {
  let expectedYield;

  if (action.hasOwnProperty('@@redux-saga/IO')) {
    expectedYield = action;
  } else {
    expectedYield = put(action);
  }

  delete expectedYield.payload.action.payload.id;

  return expectedYield;
}

function removeNotificationIdFromYieldedValue(generatorNextYield) {
  return putLike(generatorNextYield);
}
