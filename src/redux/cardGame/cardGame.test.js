import cardGameReducer, {
  ActionTypes,
  ActionCreators,
  Selectors,
} from './cardGame';

import { LEVELS } from 'constants/cardGame/levels';
import { GAME_STATUSES } from 'constants/cardGame/statuses';
import { GAME_RESULTS } from 'constants/cardGame/gameResults';

describe('CardMemoryGame Action Creators', () => {
  it('should create an action to set game level', () => {
    const level = LEVELS.Casual;
    const expectedAction = {
      type: ActionTypes.CHOOSE_LEVEL,
      payload: {
        level,
      },
    };

    expect(ActionCreators.chooseLevel(level)).toEqual(expectedAction);
  });

  it('should create an action to set game status', () => {
    const status = GAME_STATUSES.Running;
    const expectedAction = {
      type: ActionTypes.SET_STATUS,
      payload: {
        status,
      },
    };

    expect(ActionCreators.setStatus(status)).toEqual(expectedAction);
  });

  it('should create an action to fill cards', () => {
    const cards = {
      1: {
        key: 1,
        isGuessed: false,
        content: 1,
      },
    };
    const expectedAction = {
      type: ActionTypes.FILL_CARDS,
      payload: {
        cards,
      },
    };

    expect(ActionCreators.fillCards(cards)).toEqual(expectedAction);
  });

  it('should create an action to flip the card', () => {
    const cardId = 1;
    const expectedAction = {
      type: ActionTypes.FLIP_CARD,
      payload: {
        cardId,
      },
    };

    expect(ActionCreators.flipCard(cardId)).toEqual(expectedAction);
  });

  it('should create an action to finish the game', () => {
    const payload = { abandoned: true };

    expect(ActionCreators.finishGame(payload)).toEqual({
      type: ActionTypes.FINISH_GAME,
      payload,
    });

    expect(ActionCreators.finishGame()).toEqual({
      type: ActionTypes.FINISH_GAME,
      payload: {
        abandoned: false,
      },
    });
  });

  it('should create an action to update flips statistics', () => {
    const flippedCardsIds = 1;
    const expectedAction = {
      type: ActionTypes.UPDATE_FLIPS_STATISTICS,
      payload: {
        flippedCardsIds,
      },
    };

    expect(ActionCreators.updateFlipsStatistics(flippedCardsIds)).toEqual(
      expectedAction,
    );
  });

  it('should create an action to update figures statistics', () => {
    const figureKey = GAME_RESULTS.Won;
    const expectedAction = {
      type: ActionTypes.UPDATE_FIGURES_STATISTICS,
      payload: {
        key: figureKey,
      },
    };

    expect(ActionCreators.updateFiguresStatistics(figureKey)).toEqual(
      expectedAction,
    );
  });

  it('should create an action to update best time statistics', () => {
    const payload = {
      key: 'casualBestTime',
      time: 10000,
    };
    const expectedAction = {
      type: ActionTypes.UPDATE_BEST_TIME_STATISTICS,
      payload,
    };

    expect(ActionCreators.updateBestTimeStatistics(payload)).toEqual(
      expectedAction,
    );
  });
});

describe('CardMemoryGame Selectors', () => {
  const cardGameState = {
    cards: {
      1: {
        key: 1,
        isGuessed: false,
        content: 1,
      },
      2: {
        key: 3,
        isGuessed: true,
        content: 5,
      },
      3: {
        key: 3,
        isGuessed: true,
        content: 5,
      },
      4: {
        key: 1,
        isGuessed: false,
        content: 1,
      },
    },
    flippedCardsIds: [1, 2],
    status: GAME_STATUSES.Pending,
    level: null,
    statistics: {
      won: 0,
      lost: 0,
      abandoned: 0,
      matchedFlips: 0,
      wrongFlips: 0,
      casualBestTime: null,
      mediumBestTime: null,
      hardBestTime: null,
    },
  };
  const mockedState = {
    cardGame: cardGameState,
  };

  it('should return card ids', () => {
    expect(Selectors.getCardIds(mockedState)).toEqual(
      Object.keys(cardGameState.cards),
    );
  });

  it('should return card by id', () => {
    const id = 2;
    expect(Selectors.getCardById(mockedState, id)).toEqual(
      cardGameState.cards[id],
    );
  });

  it('should return flipped card ids', () => {
    expect(Selectors.getFlippedCardsIds(mockedState)).toEqual(
      cardGameState.flippedCardsIds,
    );
  });

  it('should return game statistics', () => {
    expect(Selectors.getStatistics(mockedState)).toEqual(
      cardGameState.statistics,
    );
  });

  it('should return game status', () => {
    expect(Selectors.getStatus(mockedState)).toEqual(cardGameState.status);
  });

  it('should return a count of unguessed cards', () => {
    expect(Selectors.unguessedCardsCountSelector(mockedState)).toEqual(2);
  });
});
