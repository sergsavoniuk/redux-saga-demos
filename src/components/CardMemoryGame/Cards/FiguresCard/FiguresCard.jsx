import React from 'react';
import { shape, number } from 'prop-types';
import { connect } from 'react-redux';

import withMemo from 'utils/withMemo';
import Figures from './Figures';
import BestTime from './BestTime';
import Flips from './Flips';
import { Card } from '../Cards.components';
import { Content, Meta } from './FiguresCard.components';
import { Selectors } from 'redux/cardGame/';
import { CardPropTypes } from '../Card';

export function FiguresCard({
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

FiguresCard.propTypes = {
  ...CardPropTypes,
  statistics: shape({
    won: number.isRequired,
    lost: number.isRequired,
    abandoned: number.isRequired,
    casualBestTime: number,
    mediumBestTime: number,
    hardBestTime: number,
    matchedFlips: number.isRequired,
    wrongFlips: number.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    statistics: Selectors.getStatistics(state),
  };
}

const MemoizedFiguresCard = withMemo(FiguresCard, ['isFlipped']);

export default connect(mapStateToProps)(MemoizedFiguresCard);
