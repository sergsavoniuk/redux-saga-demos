import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import Cell from './Cell';
import {
  Wrapper,
  Board,
  RemainedTimeProgressBar,
  PauseBanner,
} from './GameBoard.components';
import { ActionCreators, Selectors } from 'redux/cardGame';
import { LEVEL_TO_TIME } from 'constants/cardGame/levelToTime';
import { GAME_STATUSES } from 'constants/cardGame/statuses';

function GameBoard({
  cardIds,
  flippedCardsIds,
  status,
  unguessedCardsCount,
  checkFlippedCards,
  flipCard,
  finishGame,
  updateFlipsStatistics,
  setStatus,
  location,
}) {
  const gridRef = useRef(null);
  const params = new URLSearchParams(location.search);
  const level = params.get('level');

  useEffect(() => {
    if (flippedCardsIds.length === 2) {
      setTimeout(() => {
        checkFlippedCards();
        updateFlipsStatistics(flippedCardsIds);
      }, 400);
    }

    if (unguessedCardsCount === 0) {
      finishGame();
    }
  }, [flippedCardsIds, unguessedCardsCount]);

  useEffect(() => {
    gridRef.current.focus();
  }, []);

  function handleKeyDown(event) {
    if (event.keyCode === 27) {
      finishGame({ abandoned: true });
    }

    if (event.keyCode === 80) {
      setStatus(GAME_STATUSES.Paused);
    }
  }

  return (
    <>
      <Wrapper tabIndex="0" ref={gridRef} onKeyDown={handleKeyDown}>
        {status === GAME_STATUSES.Paused && (
          <PauseBanner>
            <h2>PAUSED</h2>
          </PauseBanner>
        )}
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
    </>
  );
}

function mapStateToProps(state) {
  return {
    cardIds: Selectors.getCardIds(state),
    flippedCardsIds: Selectors.getFlippedCardsIds(state),
    status: Selectors.getStatus(state),
    unguessedCardsCount: Selectors.unguessedCardsCountSelector(state),
  };
}

export default connect(
  mapStateToProps,
  {
    checkFlippedCards: ActionCreators.checkFlippedCards,
    flipCard: ActionCreators.flipCard,
    finishGame: ActionCreators.finishGame,
    updateFlipsStatistics: ActionCreators.updateFlipsStatistics,
    setStatus: ActionCreators.setStatus,
  },
)(GameBoard);
