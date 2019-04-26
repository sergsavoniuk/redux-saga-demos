import React from 'react';

import { Card } from '../Cards.components';

function FiguresCard({ isFlipped, onCardClick }) {
  return !isFlipped ? (
    <Card onClick={onCardClick}>F</Card>
  ) : (
    <Card flipped={isFlipped} onClick={onCardClick}>
      F
    </Card>
  );
}

export default FiguresCard;
