import React, { useEffect, useRef } from 'react';
import { func, arrayOf, number, string } from 'prop-types';
import { connect } from 'react-redux';

import Cell from './Cell';
import {
  Wrapper,
  Board,
  RemainedTimeProgressBar,
  PauseBanner,
  Text,
} from './GameBoard.components';
import { ActionCreators, Selectors } from 'redux/cardGame';
import { LEVEL_TO_TIME } from 'constants/cardGame/levelToTime';
import { GAME_STATUSES } from 'constants/cardGame/statuses';

const { Paused } = GAME_STATUSES;

const ESC_CODE = 27;
const P_CODE = 80;

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

  useEffect(
    function checkFlippedCardsAndUpdateStatistics() {
      if (flippedCardsIds.length === 2) {
        setTimeout(() => {
          checkFlippedCards();
          updateFlipsStatistics(flippedCardsIds);
        }, 400);
      }
    },
    [flippedCardsIds],
  );

  useEffect(
    function finishGameIfAllCardsHasGuessed() {
      if (unguessedCardsCount === 0) {
        finishGame();
      }
    },
    [unguessedCardsCount],
  );

  useEffect(function setFocusOnGrid() {
    gridRef.current.focus();
  }, []);

  function handleKeyDown(event) {
    if (event.keyCode === ESC_CODE) {
      finishGame({ abandoned: true });
    } else if (event.keyCode === P_CODE) {
      setStatus(Paused);
    }
  }

  return (
    <Wrapper tabIndex="0" ref={gridRef} onKeyDown={handleKeyDown}>
      {status === Paused && (
        <PauseBanner>
          <Text>PAUSED</Text>
        </PauseBanner>
      )}
      <RemainedTimeProgressBar
        paused={status === Paused}
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
