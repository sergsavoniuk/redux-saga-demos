import React from 'react';

import withMemo from 'utils/withMemo';
import { Card } from '../Cards.components';

function InstructionsCard({ name, isFlipped, onCardClick }) {
  const content = !isFlipped ? (
    <p>{name}</p>
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

export default withMemo(InstructionsCard, ['isFlipped']);
