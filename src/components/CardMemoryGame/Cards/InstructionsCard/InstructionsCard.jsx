import React from 'react';

import { Card } from '../Cards.components';

function InstructionsCard({ isFlipped, onCardClick }) {
  const content = !isFlipped ? (
    <p>I</p>
  ) : (
    <>
      <h2>Instructions</h2>
      <p>Press [p] to pause, or [ESC] to abandon game.</p>
      <p>
        Flip is a timed card memory game. Click the green cards to see what
        symbol they uncover and try to find the matching symbol underneath the
        other cards.
      </p>
      <p>
        Uncover two matching symbols at once to eliminate them from the game.
      </p>
      <p>
        Eliminate all cards as fast as you can to win the game. Have fun
        FLIPing!
      </p>
    </>
  );

  return (
    <Card flipped={isFlipped} onClick={onCardClick}>
      {content}
    </Card>
  );
}

export default InstructionsCard;
