import { take, put, all, race, select, delay } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { ActionTypes, ActionCreators } from 'redux/cardGame';
import { GAME_STATUSES } from 'constants/cardGame/statuses';
import { LEVELS } from 'constants/cardGame/levels';
import { LEVEL_TO_TIME } from 'constants/cardGame/levelToTime';

const { Casual, Medium, Hard } = LEVELS;

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

    const { timeout } = yield race({
      finish: take(ActionTypes.FINISH_GAME),
      timeout: delay(LEVEL_TO_TIME[level]),
    });

    const finishTime = performance.now();

    // const actions = [
    //   put(ActionCreators.setStatus(GAME_STATUSES.Finished)),
    //   put(push(`/apps/card-memory-game/`)),
    // ];

    if (timeout) {
      yield all([
        put(ActionCreators.setStatus(GAME_STATUSES.Finished)),
        put(push(`/apps/card-memory-game/`)),
        put(ActionCreators.updateFiguresStatistics('lost')),
      ]);
    } else {
      yield all([
        put(ActionCreators.setStatus(GAME_STATUSES.Finished)),
        put(push(`/apps/card-memory-game/`)),
        put(ActionCreators.updateFiguresStatistics('won')),
        put(
          ActionCreators.updateBestTimeStatistics({
            key: `${level}BestTime`,
            time: finishTime - startTime,
          }),
        ),
      ]);
    }
  }
}
