import { take, put, all, race, delay } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { ActionTypes, ActionCreators } from 'redux/cardGame';
import { GAME_STATUSES } from 'constants/cardGame/statuses';
import { LEVELS } from 'constants/cardGame/levels';
import { LEVEL_TO_TIME } from 'constants/cardGame/levelToTime';
import { GAME_RESULTS } from 'constants/cardGame/gameResults';

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

function generateCards(level) {
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

export function* cardGameWorkerSaga() {}

export default function* cardGameWatcher() {
  while (true) {
    const {
      payload: { level },
    } = yield take(ActionTypes.CHOOSE_LEVEL);

    yield all([
      put(ActionCreators.setStatus(GAME_STATUSES.Running)),
      put(ActionCreators.fillCards(generateCards(level))),
      put(push(`/apps/card-memory-game/play?level=${level}`)),
    ]);

    const startTime = performance.now();

    const { finish, timeout } = yield race({
      finish: take(ActionTypes.FINISH_GAME),
      timeout: delay(LEVEL_TO_TIME[level]),
    });

    const finishTime = performance.now();

    const actions = [
      ActionCreators.setStatus(GAME_STATUSES.Finished),
      push(`/apps/card-memory-game/`),
    ];

    if (timeout) {
      yield all(
        actions
          .concat(ActionCreators.updateFiguresStatistics(Lost))
          .map(action => put(action)),
      );
    } else {
      if (finish.payload.abandoned) {
        yield all(
          actions
            .concat(ActionCreators.updateFiguresStatistics(Abandoned))
            .map(action => put(action)),
        );
      } else {
        yield all(
          actions
            .concat([
              ActionCreators.updateFiguresStatistics(Won),
              ActionCreators.updateBestTimeStatistics({
                key: `${level}BestTime`,
                time: finishTime - startTime,
              }),
            ])
            .map(action => put(action)),
        );
      }
    }
  }
}
