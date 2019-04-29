import React from 'react';
import { connect } from 'react-redux';

import Figures from './Figures';
import BestTime from './BestTime';
import Flips from './Flips';
import { Card } from '../Cards.components';
import { Content, Meta } from './FiguresCard.components';
import { Selectors } from 'redux/cardGame/';

function FiguresCard({
  name,
  isFlipped,
  statistics: {
    won,
    lost,
    abandoned,
    casualBestTime,
    mediumBestTime,
    hardBestTime,
    matchedFlips,
    wrongFlips,
  },
  onCardClick,
}) {
  return !isFlipped ? (
    <Card onClick={onCardClick}>{name}</Card>
  ) : (
    <Card flipped={isFlipped} onClick={onCardClick}>
      <Content>
        <Figures won={won} lost={lost} abandoned={abandoned} />
        <Meta>
          <BestTime
            casual={casualBestTime}
            medium={mediumBestTime}
            hard={hardBestTime}
          />
          <Flips matched={matchedFlips} wrong={wrongFlips} />
        </Meta>
      </Content>
    </Card>
  );
}

function mapStateToProps(state) {
  return {
    statistics: Selectors.getStatistics(state),
  };
}

export default connect(mapStateToProps)(FiguresCard);
