import React from 'react';

import { Card, Button } from '../Cards.components';

function PlayCard({ isFlipped, onCardClick }) {
  const content = !isFlipped ? (
    <p>P</p>
  ) : (
    <>
      <Button>Casual</Button>
      <Button>Medium</Button>
      <Button>Hard</Button>
    </>
  );
  return (
    <Card fixed={isFlipped} onClick={onCardClick}>
      {content}
    </Card>
  );
}

export default PlayCard;
