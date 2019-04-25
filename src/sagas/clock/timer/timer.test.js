import { cloneableGenerator } from '@redux-saga/testing-utils';
import { take, call, all, put, select, race, delay } from 'redux-saga/effects';

import watchTimer, { timerWorkerSaga } from './timer';
import { ActionTypes, ActionCreators, Selectors } from 'redux/clock/timer';
import { ActionCreators as NotificationActionCreators } from 'redux/notifications';
import { TimerStatuses } from 'constants/clock/timerStatuses';

describe('Timer - test timer flow', () => {
  const generator = cloneableGenerator(watchTimer)();

  it('waits for start timer action', () => {
    const expectedTakeYield = take(ActionTypes.START);
    expect(generator.next().value).toEqual(expectedTakeYield);

    const expectedSelectYield = all([
      select(Selectors.getStatus),
      select(Selectors.getRemainedTime),
    ]);
    expect(generator.next({ type: ActionTypes.START }).value).toEqual(
      expectedSelectYield,
    );
  });

  it('forks the timer service', () => {
    const cloneGenerator = generator.clone();

    const remainedTime = 10;
    const status = TimerStatuses.RUNNING;

    const expectedCallYield = call(timerWorkerSaga, null);
    expect(cloneGenerator.next([status, remainedTime]).value).toEqual(
      expectedCallYield,
    );
  });

  // it('timer remained time is 0', () => {
  //   const cloneGenerator = generator.clone();
  //   const remainedTime = 0;
  //   const status = TimerStatuses.RUNNING;

  //   const expectedPutYield = all([
  //     put(ActionCreators.finish()),
  //     put(
  //       NotificationActionCreators.addNotificationToQueue({
  //         title: 'Timer',
  //         body: 'The time is up!',
  //       }),
  //     ),
  //   ]);
  //   expect(cloneGenerator.next([status, remainedTime]).value).toEqual(
  //     expectedPutYield,
  //   );
  // });
});

describe('test timerWorkerSage', () => {
  const generator = cloneableGenerator(timerWorkerSaga)(null);
  const remainedTime = 10;

  it('waits for stop, reset or tick action', () => {
    const expectedSelectYield = select(Selectors.getRemainedTime);
    expect(generator.next().value).toEqual(expectedSelectYield);

    const expectedRaceYield = race({
      stopAction: take(ActionTypes.STOP),
      resetAction: take(ActionTypes.RESET),
      tickAction: delay(1000),
    });
    expect(generator.next(remainedTime).value).toEqual(expectedRaceYield);
  });

  it('tick action', () => {
    const cloneGenerator = generator.clone();

    const expectedPutYield = put(ActionCreators.tick(remainedTime - 1));
    expect(cloneGenerator.next({ tickAction: true }).value).toEqual(
      expectedPutYield,
    );
  });

  it('reset action', () => {
    const cloneGenerator = generator.clone();

    expect(cloneGenerator.next({ resetAction: true })).toEqual({
      value: null,
      done: true,
    });
  });

  it('stop action', () => {
    const cloneGenerator = generator.clone();

    expect(cloneGenerator.next({ stopAction: true })).toEqual({
      value: 1000,
      done: true,
    });
  });
});
