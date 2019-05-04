import React, { lazy } from 'react';
import { string, bool, func } from 'prop-types';

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

export const CardPropTypes = {
  name: string.isRequired,
  isFlipped: bool.isRequired,
  onCardClick: func.isRequired,
};

Card.propTypes = CardPropTypes;

export default Card;
