import React from 'react';

import withMemo from 'utils/withMemo';
import { Card } from '../Cards.components';

function MockCard({ name }) {
  return <Card active={false}>{name}</Card>;
}

export default withMemo(MockCard, []);
