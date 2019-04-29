import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Cell from './Cell';
import {
  Wrapper,
  Board,
  RemainedTimeProgressBar,
} from './GameBoard.components';
import { ActionCreators, Selectors } from 'redux/cardGame';
import { LEVEL_TO_TIME } from 'constants/cardGame/levelToTime';

function GameBoard({
  cardIds,
  flippedCardsIds,
  unguessedCardsCount,
  checkFlippedCards,
  flipCard,
  finishGame,
  location,
}) {
  const params = new URLSearchParams(location.search);
  const level = params.get('level');

  useEffect(() => {
    if (flippedCardsIds.length === 2) {
      setTimeout(() => {
        checkFlippedCards();

        if (unguessedCardsCount === 0) {
          finishGame();
        }
      }, 400);
    }
  }, [flippedCardsIds]);

  return (
    <Wrapper>
      <RemainedTimeProgressBar totalTime={LEVEL_TO_TIME[level]} />
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
    </Wrapper>
  );
}

function mapStateToProps(state) {
  return {
    cardIds: Selectors.getCardIds(state),
    flippedCardsIds: Selectors.getFlippedCardsIds(state),
    unguessedCardsCount: Selectors.unguessedCardsCountSelector(state),
  };
}

export default connect(
  mapStateToProps,
  {
    checkFlippedCards: ActionCreators.checkFlippedCards,
    flipCard: ActionCreators.flipCard,
    finishGame: ActionCreators.finishGame,
  },
)(GameBoard);
