import { cloneableGenerator } from '@redux-saga/testing-utils';
import { take, all, put, race, fork, delay } from 'redux-saga/effects';
import { goBack, LOCATION_CHANGE } from 'connected-react-router';

import cardGameWatcher, { cardGameWorkerSaga, generateCards } from './cardGame';
import { ActionTypes, ActionCreators } from 'redux/cardGame';
import { GAME_STATUSES } from 'constants/cardGame/statuses';
import { LEVELS } from 'constants/cardGame/levels';
import { LEVEL_TO_TIME } from 'constants/cardGame/levelToTime';
import { GAME_RESULTS } from 'constants/cardGame/gameResults';

describe('CardMemoryGame - test common flow', () => {
  const generator = cardGameWatcher();
  const level = LEVELS.Casual;

  it('waits for CHOOSE_LEVEL action', () => {
    const expectedTakeYield = take(ActionTypes.CHOOSE_LEVEL);
    expect(generator.next().value).toEqual(expectedTakeYield);
  });

  it('dispatch actions to update game status, generate cards and redirect to page of play', () => {
    const expectedPutAllYield = all([
      put(ActionCreators.setStatus(GAME_STATUSES.Running)),
      putLike(ActionCreators.fillCards(generateCards(level)), { cards: {} }),
    ]);

    expect(
      clearPayloadInFillCardsAction(
        generator.next({ payload: { level } }).value,
      ),
    ).toEqual(expectedPutAllYield);
  });

  it('fork the worker saga', () => {
    const expectedForkYield = fork(cardGameWorkerSaga, level);
    expect(generator.next().value).toEqual(expectedForkYield);
  });
});

describe('CardMemoryGame - test gaming process flow', () => {
  const level = LEVELS.Casual;
  const levelTime = LEVEL_TO_TIME[level];
  const generator = cloneableGenerator(cardGameWorkerSaga)(level);

  const actions = [ActionCreators.setStatus(GAME_STATUSES.Finished), goBack()];

  it('waits for finish, pause or timeout action', () => {
    const expectedRaceYield = race({
      finish: take(ActionTypes.FINISH_GAME),
      changeLocation: take(LOCATION_CHANGE),
      timeout: delay(levelTime),
      pause: take(ActionTypes.SET_STATUS),
    });

    expect(generator.next().value).toEqual(expectedRaceYield);
  });

  it('timeout action', () => {
    const cloneGenerator = generator.clone();
    const expectedAllPutYield = all(
      actions
        .concat(ActionCreators.updateFiguresStatistics(GAME_RESULTS.Lost))
        .map(action => put(action)),
    );

    expect(cloneGenerator.next({ timeout: true }).value).toEqual(
      expectedAllPutYield,
    );
    expect(cloneGenerator.next().done).toBe(true);
  });

  it('finish action - user abandoned the game', () => {
    const cloneGenerator = generator.clone();
    const expectedAllPutYield = all(
      actions
        .concat(ActionCreators.updateFiguresStatistics(GAME_RESULTS.Abandoned))
        .map(action => put(action)),
    );

    expect(
      cloneGenerator.next({ finish: { payload: { abandoned: true } } }).value,
    ).toEqual(expectedAllPutYield);
    expect(cloneGenerator.next().done).toBe(true);
  });

  it('finish action - use won the game', () => {
    const cloneGenerator = generator.clone();
    const expectedAllPutYield = all(
      actions
        .concat([
          ActionCreators.updateFiguresStatistics(GAME_RESULTS.Won),
          ActionCreators.updateBestTimeStatistics({
            key: `${level}BestTime`,
            time: 14000,
          }),
        ])
        .map(action => {
          if (action.type === ActionTypes.UPDATE_BEST_TIME_STATISTICS) {
            return putLike(action, {
              key: `${level}BestTime`,
              time: 100,
            });
          }
          return put(action);
        }),
    );

    expect(
      updatePayloadInUpdateBestTimeStatistics(
        cloneGenerator.next({ finish: { payload: { abandoned: false } } })
          .value,
      ),
    ).toEqual(expectedAllPutYield);
    expect(cloneGenerator.next().done).toBe(true);
  });

  it('change location action - game is abandoned', () => {
    const cloneGenerator = generator.clone();
    const expectedAllPutYield = all(
      actions
        .slice(0, 1)
        .concat(ActionCreators.updateFiguresStatistics(GAME_RESULTS.Abandoned))
        .map(action => put(action)),
    );

    expect(
      cloneGenerator.next({
        changeLocation: { payload: { location: { pathname: '/' } } },
      }).value,
    ).toEqual(expectedAllPutYield);
    expect(cloneGenerator.next().done).toBe(true);
  });

  it('pause action', () => {
    const cloneGenerator = generator.clone();
    const expectedRaceYield = race({
      setRunningStatus: take(ActionTypes.SET_STATUS),
      finishGame: take(ActionTypes.FINISH_GAME),
    });

    expect(cloneGenerator.next({ pause: true }).value).toEqual(
      expectedRaceYield,
    );
    expect(cloneGenerator.next({ finishGame: false }).done).toBe(false);
  });

  it('pause action and then finish the game (user abandoned)', () => {
    const cloneGenerator = generator.clone();
    const expectedRaceYield = race({
      setRunningStatus: take(ActionTypes.SET_STATUS),
      finishGame: take(ActionTypes.FINISH_GAME),
    });

    expect(cloneGenerator.next({ pause: true }).value).toEqual(
      expectedRaceYield,
    );

    const expectedAllPutYield = all(
      actions
        .concat(ActionCreators.updateFiguresStatistics(GAME_RESULTS.Abandoned))
        .map(action => put(action)),
    );
    expect(cloneGenerator.next({ finishGame: true }).value).toEqual(
      expectedAllPutYield,
    );
    expect(cloneGenerator.next().done).toBe(true);
  });
});

// Helpers
function putLike(action, payload) {
  let expectedPutObject;

  if (action.hasOwnProperty('@@redux-saga/IO')) {
    expectedPutObject = action;
  } else {
    expectedPutObject = put(action);
  }

  return {
    ...expectedPutObject,
    payload: {
      ...expectedPutObject.payload,
      action: {
        ...expectedPutObject.payload.action,
        payload,
      },
    },
  };
}

function clearPayloadInFillCardsAction(generatorNextYieldedValue) {
  return {
    ...generatorNextYieldedValue,
    payload: generatorNextYieldedValue.payload.map(payloadItem => {
      if (payloadItem.payload.action.type === ActionTypes.FILL_CARDS) {
        return putLike(payloadItem, { cards: {} });
      }
      return payloadItem;
    }),
  };
}

function updatePayloadInUpdateBestTimeStatistics(generatorNextYieldedValue) {
  return {
    ...generatorNextYieldedValue,
    payload: generatorNextYieldedValue.payload.map(payloadItem => {
      if (
        payloadItem.payload.action.type ===
        ActionTypes.UPDATE_BEST_TIME_STATISTICS
      ) {
        return putLike(payloadItem, {
          key: `casualBestTime`,
          time: 100,
        });
      }
      return payloadItem;
    }),
  };
}
