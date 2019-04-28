import React from 'react';
import { connect } from 'react-redux';

import { Card, Button } from '../Cards.components';
import { ActionCreators } from 'redux/cardGame';
import { LEVELS } from 'constants/cardGame/levels';

const { Casual, Medium, Hard } = LEVELS;

function PlayCard({ name, isFlipped, onCardClick, chooseLevel }) {
  function handleChooseLevel(event) {
    const level = event.target.name;
    chooseLevel(level);
  }

  const content = !isFlipped ? (
    <p>{name}</p>
  ) : (
    <>
      <Button name={Casual} onClick={handleChooseLevel}>
        Casual
      </Button>
      <Button name={Medium} onClick={handleChooseLevel}>
        Medium
      </Button>
      <Button name={Hard} onClick={handleChooseLevel}>
        Hard
      </Button>
    </>
  );
  return (
    <Card fixed={isFlipped} onClick={onCardClick}>
      {content}
    </Card>
  );
}

export default connect(
  null,
  {
    chooseLevel: ActionCreators.chooseLevel,
  },
)(PlayCard);
