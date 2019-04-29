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
    bestCasualTime: null,
    bestMediumTime: null,
    bestHardTime: null,
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
