import React, { useState } from 'react';

import Card from './Card';
import { Cards as StyledCards } from './Cards.components';
import { CARDS } from 'constants/cardGame/cards';

function isCardVisible(cardName, flippedCard) {
  if (cardName === CARDS.Mock && flippedCard === CARDS.Figures) {
    return false;
  } else if (cardName === CARDS.Play && flippedCard === CARDS.Instructions) {
    return false;
  }
  return true;
}

function Cards() {
  const [flippedCard, setFlippedCard] = useState(null);

  function handleCardClick(name) {
    if (name === flippedCard) {
      setFlippedCard(null);
    } else {
      setFlippedCard(name);
    }
  }

  return (
    <StyledCards>
      {Object.keys(CARDS).map(
        name =>
          isCardVisible(CARDS[name], flippedCard) && (
            <Card
              key={name}
              name={CARDS[name]}
              isFlipped={CARDS[name] === flippedCard}
              onCardClick={handleCardClick}
            />
          ),
      )}
    </StyledCards>
  );
}

export default Cards;
