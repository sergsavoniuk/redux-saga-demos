import React from 'react';

import withMemo from 'utils/withMemo';
import { Card } from '../Cards.components';
import { CardPropTypes } from '../Card';

function MockCard({ name }) {
  return <Card active={false}>{name}</Card>;
}

MockCard.propTypes = CardPropTypes;

export default withMemo(MockCard, []);
