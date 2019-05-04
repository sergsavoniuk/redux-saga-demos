import React from 'react';
import { string, func } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Button } from './LevelButton.components';
import { ActionCreators } from 'redux/cardGame';
import { ROUTES } from 'constants/routes';

export function LevelButton({ level, chooseLevel }) {
  function handleChooseLevel() {
    chooseLevel(level);
  }

  return (
    <Button
      as={Link}
      to={{
        pathname: `${ROUTES.CardGameApp.Play}`,
        search: `?level=${level}`,
      }}
      onClick={handleChooseLevel}
    >
      {level}
    </Button>
  );
}

LevelButton.propTypes = {
  level: string.isRequired,
  chooseLevel: func.isRequired,
};

export default connect(
  null,
  {
    chooseLevel: ActionCreators.chooseLevel,
  },
)(LevelButton);
