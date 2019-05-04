import React from 'react';
import { string, bool, func, shape, number } from 'prop-types';
import { connect } from 'react-redux';

import { Card, Front, Back, Image } from '../GameBoard.components';
import { Selectors } from 'redux/cardGame';

export function Cell({ id, flipped, card, onFlip }) {
  function handleCardFlip() {
    onFlip(id);
  }

  return (
    <Card flipped={flipped} visible={!card.isGuessed} onClick={handleCardFlip}>
      <Front />
      <Back>
        <Image name={card.content} />
      </Back>
    </Card>
  );
}

Cell.propTypes = {
  id: string.isRequired,
  flipped: bool.isRequired,
  card: shape({
    key: number.isRequired,
    content: string.isRequired,
    isGuessed: bool.isRequired,
  }).isRequired,
  onFlip: func.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    card: Selectors.getCardById(state, ownProps.id),
  };
}

export default connect(mapStateToProps)(Cell);
