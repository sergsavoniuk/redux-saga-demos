import React from 'react';

import withMemo from 'utils/withMemo';
import { Card } from '../Cards.components';
import { LEVELS } from 'constants/cardGame/levels';
import { CardPropTypes } from '../Card';

import LevelButton from './LevelButton';

const { Casual, Medium, Hard } = LEVELS;

function PlayCard({ name, isFlipped, onCardClick }) {
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

PlayCard.propTypes = CardPropTypes;

export default withMemo(PlayCard, ['isFlipped']);
