import cardGameReducer, {
  ActionTypes,
  ActionCreators,
  Selectors,
} from './cardGame';

import { LEVELS } from 'constants/cardGame/levels';
import { GAME_STATUSES } from 'constants/cardGame/statuses';
import { GAME_RESULTS } from 'constants/cardGame/gameResults';

const { Pending, Running, Paused } = GAME_STATUSES;

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
    const status = Running;
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

describe('CardMemoryGame reducer', () => {
  const initialState = {
    cards: {},
    flippedCardsIds: [],
    status: Pending,
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

  it('should return the initial state', () => {
    expect(cardGameReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle CHOOSE_LEVEL action', () => {
    const level = LEVELS.Casual;
    expect(
      cardGameReducer(initialState, ActionCreators.chooseLevel(level)),
    ).toEqual({
      ...initialState,
      level,
    });
  });

  it('should handle SET_STATUS action', () => {
    const status = Paused;
    const expectedState = cardGameReducer(
      initialState,
      ActionCreators.setStatus(status),
    );
    expect(expectedState).toEqual({
      ...initialState,
      status,
    });

    // if the current and new statuses are Paused then change the status to Running
    expect(
      cardGameReducer(expectedState, ActionCreators.setStatus(status)),
    ).toEqual({
      ...expectedState,
      status: Running,
    });
  });

  it('should handle FILL_CARDS action', () => {
    const cards = {
      1: {
        key: 100,
        isGuessed: false,
        content: 5,
      },
    };
    const flippedCardsIds = [];
    expect(
      cardGameReducer(initialState, ActionCreators.fillCards(cards)),
    ).toEqual({
      ...initialState,
      cards,
      flippedCardsIds,
    });
  });

  it('should handle FLIP_CARD action', () => {
    const cardId = 1;
    const flippedCardsIds = [cardId];

    const expectedState = cardGameReducer(
      initialState,
      ActionCreators.flipCard(cardId),
    );
    expect(expectedState).toEqual({
      ...initialState,
      flippedCardsIds,
    });

    // if the current card has already flipped then don't touch it
    expect(
      cardGameReducer(expectedState, ActionCreators.flipCard(cardId)),
    ).toEqual(expectedState);
  });

  it('should handle CHECK_FLIPPED_CARDS action', () => {
    const state = {
      ...initialState,
      cards: {
        1: {
          key: 100,
          isGuessed: false,
          content: 4,
        },
        2: {
          key: 101,
          isGuessed: false,
          content: 8,
        },
        3: {
          key: 100,
          isGuessed: false,
          content: 4,
        },
        4: {
          key: 101,
          isGuessed: false,
          content: 8,
        },
      },
    };
    let flippedCardsIds = [1, 4];

    expect(
      cardGameReducer(
        { ...state, flippedCardsIds },
        ActionCreators.checkFlippedCards(),
      ),
    ).toEqual({
      ...state,
      flippedCardsIds: [],
    });

    flippedCardsIds = [1, 3];

    expect(
      cardGameReducer(
        { ...state, flippedCardsIds },
        ActionCreators.checkFlippedCards(),
      ),
    ).toEqual({
      ...state,
      flippedCardsIds: [],
      cards: {
        ...state.cards,
        1: {
          ...state.cards[1],
          isGuessed: true,
        },
        3: {
          ...state.cards[3],
          isGuessed: true,
        },
      },
    });
  });

  it('should handle UPDATE_FLIPS_STATISTICS', () => {
    const state = {
      ...initialState,
      cards: {
        1: {
          key: 100,
          isGuessed: false,
          content: 4,
        },
        2: {
          key: 101,
          isGuessed: false,
          content: 8,
        },
        3: {
          key: 100,
          isGuessed: false,
          content: 4,
        },
        4: {
          key: 101,
          isGuessed: false,
          content: 8,
        },
      },
    };

    let flippedCardsIds = [1, 2];
    expect(
      cardGameReducer(
        state,
        ActionCreators.updateFlipsStatistics(flippedCardsIds),
      ),
    ).toEqual({
      ...state,
      statistics: {
        ...state.statistics,
        wrongFlips: state.statistics.wrongFlips + 1,
      },
    });

    flippedCardsIds = [1, 3];
    expect(
      cardGameReducer(
        state,
        ActionCreators.updateFlipsStatistics(flippedCardsIds),
      ),
    ).toEqual({
      ...state,
      statistics: {
        ...state.statistics,
        matchedFlips: state.statistics.matchedFlips + 1,
      },
    });
  });

  it('should handle UPDATE_FIGURES_STATISTICS action', () => {
    let key = GAME_RESULTS.Won;
    const expectedState = cardGameReducer(
      initialState,
      ActionCreators.updateFiguresStatistics(key),
    );

    expect(expectedState).toEqual({
      ...initialState,
      statistics: {
        ...initialState.statistics,
        [key]: initialState.statistics[key] + 1,
      },
    });

    key = GAME_RESULTS.Lost;
    expect(
      cardGameReducer(
        expectedState,
        ActionCreators.updateFiguresStatistics(key),
      ),
    ).toEqual({
      ...expectedState,
      statistics: {
        ...expectedState.statistics,
        [key]: expectedState.statistics[key] + 1,
      },
    });
  });

  it('should handle UPDATE_BEST_TIME_STATISTICS action', () => {
    let time = 25000;
    const payload = {
      key: 'casualBestTime',
      time,
    };

    let expectedState = cardGameReducer(
      initialState,
      ActionCreators.updateBestTimeStatistics(payload),
    );
    expect(expectedState).toEqual({
      ...initialState,
      statistics: {
        ...initialState.statistics,
        [payload.key]: payload.time,
      },
    });

    // if the new time bigger than current, then return old state
    time = 27000;
    expectedState = cardGameReducer(
      expectedState,
      ActionCreators.updateBestTimeStatistics({
        ...payload,
        time,
      }),
    );
    expect(expectedState).toEqual(expectedState);

    // if the new time less than current, then update the current time
    time = 24000;
    expectedState = cardGameReducer(
      expectedState,
      ActionCreators.updateBestTimeStatistics({
        ...payload,
        time,
      }),
    );
    expect(expectedState).toEqual({
      ...initialState,
      statistics: {
        ...initialState.statistics,
        [payload.key]: time,
      },
    });
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
    status: Pending,
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
