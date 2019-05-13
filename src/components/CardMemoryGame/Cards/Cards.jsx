import React, { useState } from 'react';

import Card from './Card';
import { Wrapper, Tip, Cards as StyledCards } from './Cards.components';
import { CARDS } from 'constants/cardGame/cards';

const { Mock, Figures, Play, Instructions } = CARDS;

function isCardVisible(cardName, flippedCard) {
  if (
    (cardName === Mock && flippedCard === Figures) ||
    (cardName === Play && flippedCard === Instructions)
  ) {
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
    <Wrapper>
      <Tip>Click P to get started.</Tip>
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
    </Wrapper>
  );
}

export default Cards;
