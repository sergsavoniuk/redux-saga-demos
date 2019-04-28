import React from 'react';

import { Card } from '../Cards.components';

function MockCard({ name }) {
  return <Card active={false}>{name}</Card>;
}

export default MockCard;
