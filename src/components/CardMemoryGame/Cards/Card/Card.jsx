import React, { lazy } from 'react';

import { CARDS } from 'constants/cardGame/cards';

const { Figures, Mock, Instructions, Play } = CARDS;

const Cards = {
  [Figures]: lazy(() =>
    import(/* webpackChunkName: "FiguresCard" */ '../FiguresCard'),
  ),
  [Mock]: lazy(() => import(/* webpackChunkName: "MockCard" */ '../MockCard')),
  [Instructions]: lazy(() =>
    import(/* webpackChunkName: "InstructionsCard" */ '../InstructionsCard'),
  ),
  [Play]: lazy(() => import(/* webpackChunkName: "PlayCard" */ '../PlayCard')),
};

function Card({ name, isFlipped, onCardClick }) {
  function handleCardClick() {
    onCardClick(name);
  }

  const CardComponent = Cards[name];

  return (
    <CardComponent
      name={name}
      isFlipped={isFlipped}
      onCardClick={handleCardClick}
    />
  );
}

export default Card;
