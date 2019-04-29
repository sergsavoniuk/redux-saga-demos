import { createSelector } from 'reselect';

import { GAME_STATUSES } from 'constants/cardGame/statuses';

// Action Types
export const ActionTypes = {
  CHOOSE_LEVEL: '@cardGame/CHOOSE_LEVEL',
  SET_STATUS: '@card/SET_STATUS',
  FILL_CARDS: '@cardGame/FILL_CARDS',
  FLIP_CARD: '@cardGame/FLIP_CARD',
  CHECK_FLIPPED_CARDS: '@cardName/CHECK_FLIPPED_CARDS',
  FINISH_GAME: '@cardGame/FINISH_GAME',
  UPDATE_FLIPS_STATISTICS: '@cardGame/UPDATE_FLIPS_STATISTICS',
  UPDATE_FIGURES_STATISTICS: '@cardGame/UPDATE_FIGURES_STATISTICS',
  UPDATE_BEST_TIME_STATISTICS: '@cardGame/UPDATE_BEST_TIME_STATISTICS',
};

// Action Creators
export const ActionCreators = {
  chooseLevel(level) {
    return {
      type: ActionTypes.CHOOSE_LEVEL,
      payload: {
        level,
      },
    };
  },

  setStatus(status) {
    return {
      type: ActionTypes.SET_STATUS,
      payload: {
        status,
      },
    };
  },

  fillCards(cards) {
    return {
      type: ActionTypes.FILL_CARDS,
      payload: {
        cards,
      },
    };
  },

  flipCard(cardId) {
    return {
      type: ActionTypes.FLIP_CARD,
      payload: {
        cardId,
      },
    };
  },

  checkFlippedCards() {
    return {
      type: ActionTypes.CHECK_FLIPPED_CARDS,
    };
  },

  finishGame() {
    return {
      type: ActionTypes.FINISH_GAME,
    };
  },

  updateFlipsStatistics(flippedCardsIds) {
    return {
      type: ActionTypes.UPDATE_FLIPS_STATISTICS,
      payload: {
        flippedCardsIds,
      },
    };
  },

  updateFiguresStatistics(key) {
    return {
      type: ActionTypes.UPDATE_FIGURES_STATISTICS,
      payload: {
        key,
      },
    };
  },

  updateBestTimeStatistics({ key, time }) {
    return {
      type: ActionTypes.UPDATE_BEST_TIME_STATISTICS,
      payload: {
        key,
        time,
      },
    };
  },
};

const initialState = {
  cards: {},
  flippedCardsIds: [],
  status: GAME_STATUSES.Pending,
  level: null,
  statistics: {
    won: 0,
    lost: 0,
    matchedFlips: 0,
    wrongFlips: 0,
    casualBestTime: null,
    mediumBestTime: null,
    hardBestTime: null,
  },
};

// Reducer
export default function cardGameReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.CHOOSE_LEVEL: {
      return {
        ...state,
        level: action.payload.level,
      };
    }
    case ActionTypes.SET_STATUS: {
      return {
        ...state,
        status: action.payload.status,
      };
    }
    case ActionTypes.FILL_CARDS: {
      return {
        ...state,
        cards: action.payload.cards,
        flippedCardsIds: [],
      };
    }
    case ActionTypes.FLIP_CARD: {
      const { cardId } = action.payload;
      const flippedCardsIds = state.flippedCardsIds;
      return {
        ...state,
        flippedCardsIds: flippedCardsIds.includes(cardId)
          ? flippedCardsIds
          : flippedCardsIds.concat(cardId),
      };
    }
    case ActionTypes.CHECK_FLIPPED_CARDS: {
      const [firstCardId, secondCardId] = state.flippedCardsIds;
      const flippedCardsIdsMatched =
        state.cards[firstCardId].key === state.cards[secondCardId].key;
      return {
        ...state,
        flippedCardsIds: [],
        cards: flippedCardsIdsMatched
          ? {
              ...state.cards,
              [firstCardId]: {
                ...state.cards[firstCardId],
                isGuessed: true,
              },
              [secondCardId]: {
                ...state.cards[secondCardId],
                isGuessed: true,
              },
            }
          : state.cards,
      };
    }
    case ActionTypes.UPDATE_FLIPS_STATISTICS: {
      const [firstCardId, secondCardId] = action.payload.flippedCardsIds;
      const flippedCardsIdsMatched =
        state.cards[firstCardId].key === state.cards[secondCardId].key;
      return {
        ...state,
        statistics: {
          ...state.statistics,
          matchedFlips: flippedCardsIdsMatched
            ? state.statistics.matchedFlips + 1
            : state.statistics.matchedFlips,
          wrongFlips: flippedCardsIdsMatched
            ? state.statistics.wrongFlips
            : state.statistics.wrongFlips + 1,
        },
      };
    }
    case ActionTypes.UPDATE_FIGURES_STATISTICS: {
      const { key } = action.payload;
      return {
        ...state,
        statistics: {
          ...state.statistics,
          [key]: state.statistics[key] + 1,
        },
      };
    }
    case ActionTypes.UPDATE_BEST_TIME_STATISTICS: {
      const { key, time } = action.payload;
      return {
        ...state,
        statistics: {
          ...state.statistics,
          [key]:
            state.statistics[key] !== null && state.statistics[key] < time
              ? state.statistics[key]
              : time,
        },
      };
    }
    default:
      return state;
  }
}

// Selectors
export const Selectors = {
  getCardIds(state) {
    return Object.keys(state.cardGame.cards);
  },

  getCardById(state, cardId) {
    return state.cardGame.cards[cardId];
  },

  getFlippedCardsIds(state) {
    return state.cardGame.flippedCardsIds;
  },

  getStatistics(state) {
    return state.cardGame.statistics;
  },

  unguessedCardsCountSelector: createSelector(
    state => state.cardGame.cards,
    cards =>
      Object.keys(cards).reduce((acc, card) => {
        if (!cards[card].isGuessed) {
          acc.push(card);
        }
        return acc;
      }, []).length,
  ),
};
