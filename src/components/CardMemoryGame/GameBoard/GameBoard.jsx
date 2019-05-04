import React, { useEffect, useRef } from 'react';
import { func, arrayOf, number, string } from 'prop-types';
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

export function GameBoard({
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
  const level = new URLSearchParams(location.search).get('level');

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
        <RemainedTimeProgressBar
          paused={status === GAME_STATUSES.Paused}
          totalTime={LEVEL_TO_TIME[level]}
        />
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

GameBoard.propTypes = {
  cardIds: arrayOf(string).isRequired,
  flippedCardsIds: arrayOf(string).isRequired,
  status: string.isRequired,
  unguessedCardsCount: number.isRequired,
  checkFlippedCards: func.isRequired,
  flipCard: func.isRequired,
  finishGame: func.isRequired,
  updateFlipsStatistics: func.isRequired,
  setStatus: func.isRequired,
};

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
