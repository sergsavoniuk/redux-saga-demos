import { take, put, all, race, fork, delay } from 'redux-saga/effects';
import { goBack, LOCATION_CHANGE } from 'connected-react-router';

import { ActionTypes, ActionCreators } from 'redux/cardGame';
import { GAME_STATUSES } from 'constants/cardGame/statuses';
import { LEVELS } from 'constants/cardGame/levels';
import { LEVEL_TO_TIME } from 'constants/cardGame/levelToTime';
import { GAME_RESULTS } from 'constants/cardGame/gameResults';
import { ROUTES } from 'constants/routes';

const { Casual, Medium, Hard } = LEVELS;
const { Won, Lost, Abandoned } = GAME_RESULTS;

const LEVEL_TO_BOARD_CELLS = {
  [Casual]: 16,
  [Medium]: 20,
  [Hard]: 32,
};

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateAndFillArray(length) {
  const array = [];
  for (let i = 1; i <= length; ++i) {
    array.push(i);
  }
  return array;
}

export function generateCards(level) {
  const cardArray = shuffle([
    ...generateAndFillArray(LEVEL_TO_BOARD_CELLS[level] / 2),
    ...generateAndFillArray(LEVEL_TO_BOARD_CELLS[level] / 2),
  ]);

  const cards = {};
  cardArray.forEach((card, index) => {
    cards[index] = {
      key: card,
      content: card,
      isGuessed: false,
    };
  });
  return cards;
}

export function* cardGameWorkerSaga(gameLevel) {
  const levelTime = LEVEL_TO_TIME[gameLevel];

  let timeSpent = 0;

  while (true) {
    const startTime = performance.now();

    const { finish, changeLocation, timeout, pause } = yield race({
      finish: take(ActionTypes.FINISH_GAME),
      changeLocation: take(LOCATION_CHANGE),
      timeout: delay(
        Math.abs(levelTime - timeSpent) < 1000
          ? levelTime
          : levelTime - timeSpent,
      ),
      pause: take(ActionTypes.SET_STATUS),
    });

    timeSpent = performance.now() - startTime;

    const actions = [
      ActionCreators.setStatus(GAME_STATUSES.Finished),
      goBack(),
    ];

    if (timeout) {
      yield all(
        actions
          .concat(ActionCreators.updateFiguresStatistics(Lost))
          .map(action => put(action)),
      );
      break;
    } else if (
      finish ||
      (changeLocation &&
        changeLocation.payload.location.pathname !== ROUTES.CardGameApp.Play)
    ) {
      if (changeLocation || finish.payload.abandoned) {
        const appliedAction = finish ? actions : actions.slice(0, 1);
        yield all(
          appliedAction
            .concat(ActionCreators.updateFiguresStatistics(Abandoned))
            .map(action => put(action)),
        );
      } else {
        yield all(
          actions
            .concat([
              ActionCreators.updateFiguresStatistics(Won),
              ActionCreators.updateBestTimeStatistics({
                key: `${gameLevel}BestTime`,
                time: timeSpent,
              }),
            ])
            .map(action => put(action)),
        );
      }
      break;
    } else if (pause) {
      const { finishGame } = yield race({
        setRunningStatus: take(ActionTypes.SET_STATUS),
        finishGame: take(ActionTypes.FINISH_GAME),
      });

      if (finishGame) {
        yield all(
          actions
            .concat(ActionCreators.updateFiguresStatistics(Abandoned))
            .map(action => put(action)),
        );
        break;
      }
    }
  }
}

export default function* cardGameWatcher() {
  while (true) {
    const {
      payload: { level },
    } = yield take(ActionTypes.CHOOSE_LEVEL);

    yield all([
      put(ActionCreators.setStatus(GAME_STATUSES.Running)),
      put(ActionCreators.fillCards(generateCards(level))),
    ]);

    yield fork(cardGameWorkerSaga, level);
  }
}
