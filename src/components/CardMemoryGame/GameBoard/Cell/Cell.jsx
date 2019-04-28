import React from 'react';
import { connect } from 'react-redux';

import { Card, Front, Back } from '../GameBoard.components';
import { ActionCreators, Selectors } from 'redux/cardGame';

export function Cell({ id, isFlipped, level, card, flipCard }) {
  function handleCardFlip() {
    flipCard(id);
  }

  return (
    <Card
      isFlipped={isFlipped}
      isGuessed={card.isGuessed}
      level={level}
      onClick={handleCardFlip}
    >
      <Front />
      <Back isFlipped={isFlipped}>{card.key}</Back>
    </Card>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    card: Selectors.getCardById(state, ownProps.id),
  };
}

export default connect(
  mapStateToProps,
  {
    flipCard: ActionCreators.flipCard,
  },
)(Cell);
