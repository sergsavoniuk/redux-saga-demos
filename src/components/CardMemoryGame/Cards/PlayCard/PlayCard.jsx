import React from 'react';

import { Card } from '../Cards.components';
import { LEVELS } from 'constants/cardGame/levels';

import LevelButton from './LevelButton';

const { Casual, Medium, Hard } = LEVELS;

function PlayCard({ name, isFlipped, onCardClick, chooseLevel }) {
  const content = !isFlipped ? (
    <p>{name}</p>
  ) : (
    <>
      <LevelButton level={Casual} />
      <LevelButton level={Medium} />
      <LevelButton level={Hard} />
    </>
  );
  return (
    <Card fixed={isFlipped} onClick={onCardClick}>
      {content}
    </Card>
  );
}

export default PlayCard;
