import { GAME_STATUSES } from 'constants/cardGame/statuses';

// Action Types
export const ActionTypes = {
  CHOOSE_LEVEL: '@cardGame/CHOOSE_LEVEL',
  SET_STATUS: '@card/SET_STATUS',
  FILL_CARDS: '@cardGame/FILL_CARDS',
  FLIP_CARD: '@cardGame/FLIP_CARD',
  CHECK_FLIPPED_CARDS: '@cardName/CHECK_FLIPPED_CARDS',
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
};

const initialState = {
  cards: {},
  flippedCards: [],
  status: GAME_STATUSES.Pending,
  level: null,
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
      return {
        ...state,
        flippedCards: state.flippedCards.concat(action.payload.cardId),
      };
    }
    case ActionTypes.CHECK_FLIPPED_CARDS: {
      const [firstCardId, secondCardId] = state.flippedCards;
      const flippedCardsMatched =
        state.cards[firstCardId].key === state.cards[secondCardId].key;
      return {
        ...state,
        flippedCards: [],
        cards: flippedCardsMatched
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

  getFlippedCards(state) {
    return state.cardGame.flippedCards;
  },
};
