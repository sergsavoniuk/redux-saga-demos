import { take, put, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { ActionTypes, ActionCreators } from 'redux/cardGame';
import { GAME_STATUSES } from 'constants/cardGame/statuses';
import { LEVELS } from 'constants/cardGame/levels';

const levelToBoardCells = new Map([
  [LEVELS.Casual, 16],
  [LEVELS.Medium, 20],
  [LEVELS.Hard, 32],
]);

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
    ...generateAndFillArray(levelToBoardCells.get(level) / 2),
    ...generateAndFillArray(levelToBoardCells.get(level) / 2),
  ]);

  const cards = {};
  cardArray.forEach((card, index) => {
    cards[index] = {
      key: card,
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
  }
}
