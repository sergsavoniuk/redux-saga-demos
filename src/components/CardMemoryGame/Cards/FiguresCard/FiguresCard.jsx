import React from 'react';

import { Card } from '../Cards.components';

function FiguresCard({ name, isFlipped, onCardClick }) {
  return !isFlipped ? (
    <Card onClick={onCardClick}>{name}</Card>
  ) : (
    <Card flipped={isFlipped} onClick={onCardClick}>
      F
    </Card>
  );
}

export default FiguresCard;
