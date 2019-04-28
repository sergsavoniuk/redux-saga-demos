import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Cell from './Cell';
import { Board } from './GameBoard.components';
import { ActionCreators, Selectors } from 'redux/cardGame';

function GameBoard({
  cardIds,
  flippedCardsIds,
  checkFlippedCards,
  flipCard,
  location,
}) {
  const params = new URLSearchParams(location.search);
  const level = params.get('level');

  useEffect(() => {
    if (flippedCardsIds.length === 2) {
      setTimeout(checkFlippedCards, 700);
    }
  }, [flippedCardsIds]);

  return (
    <Board level={level}>
      {cardIds.map(cardId => (
        <Cell
          key={cardId}
          id={cardId}
          flipped={flippedCardsIds.includes(cardId)}
          onFlip={flipCard}
        />
      ))}
    </Board>
  );
}

function mapStateToProps(state) {
  return {
    cardIds: Selectors.getCardIds(state),
    flippedCardsIds: Selectors.getFlippedCardsIds(state),
  };
}

export default connect(
  mapStateToProps,
  {
    checkFlippedCards: ActionCreators.checkFlippedCards,
    flipCard: ActionCreators.flipCard,
  },
)(GameBoard);
