import React from 'react';

import { Card, StyledLink as Link } from '../Cards.components';

const baseUrl = '/apps/card-memory-game';

function PlayCard({ isFlipped, onCardClick }) {
  const content = !isFlipped ? (
    <p>P</p>
  ) : (
    <>
      <Link
        to={{
          pathname: `${baseUrl}/play`,
          search: '?level=casual',
        }}
      >
        Casual
      </Link>
      <Link
        to={{
          pathname: `${baseUrl}/play`,
          search: '?level=medium',
        }}
      >
        Medium
      </Link>
      <Link
        to={{
          pathname: `${baseUrl}/play`,
          search: '?level=hard',
        }}
      >
        Hard
      </Link>
    </>
  );
  return (
    <Card fixed={isFlipped} onClick={onCardClick}>
      {content}
    </Card>
  );
}

export default PlayCard;
