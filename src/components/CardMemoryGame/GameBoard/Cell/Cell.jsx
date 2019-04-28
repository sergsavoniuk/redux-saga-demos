import React from 'react';
import { connect } from 'react-redux';

import { Card, Front, Back } from '../GameBoard.components';
import { Selectors } from 'redux/cardGame';

export function Cell({ id, flipped, card, onFlip }) {
  function handleCardFlip() {
    onFlip(id);
  }

  return (
    <Card flipped={flipped} visible={!card.isGuessed} onClick={handleCardFlip}>
      <Front />
      <Back>{card.key}</Back>
    </Card>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    card: Selectors.getCardById(state, ownProps.id),
  };
}

export default connect(mapStateToProps)(Cell);
