import React from 'react';

import { Cards, Card } from './GameBoard.components';

function GameBoard(props) {
  return (
    <Cards>
      {Array(16)
        .fill(0)
        .map((_, index) => (
          <Card level="casual" key={index} />
        ))}
    </Cards>
  );
}
export default GameBoard;
