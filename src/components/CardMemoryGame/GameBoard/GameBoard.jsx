import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Cell from './Cell';
import { Board } from './GameBoard.components';
import { Selectors } from 'redux/cardGame';
import { ActionCreators } from '../../../redux/cardGame/cardGame';

function GameBoard({ cardIds, flippedCards, checkFlippedCards, location }) {
  const params = new URLSearchParams(location.search);
  const level = params.get('level');

  useEffect(() => {
    if (flippedCards.length === 2) {
      setTimeout(checkFlippedCards, 700);
    }
  }, [flippedCards]);

  return (
    <Board>
      {cardIds.map(cardId => (
        <Cell
          key={cardId}
          id={cardId}
          isFlipped={flippedCards.includes(cardId)}
          level={level}
        />
      ))}
    </Board>
  );
}

function mapStateToProps(state) {
  return {
    cardIds: Selectors.getCardIds(state),
    flippedCards: Selectors.getFlippedCards(state),
  };
}

export default connect(
  mapStateToProps,
  {
    checkFlippedCards: ActionCreators.checkFlippedCards,
  },
)(GameBoard);
