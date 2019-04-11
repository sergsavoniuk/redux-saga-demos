import React from 'react';

import {
  CardList,
  Card,
  Title,
  Description,
  ClockAppLogo,
} from './AppCard.components';

function AppCard() {
  return (
    <CardList>
      <Card>
        <Title>Clock App</Title>
        <ClockAppLogo />
        <Description>
          Minimalistic clock app with alarm clock, stopwatch and timer
        </Description>
      </Card>
      <Card>
        <Title>Clock App</Title>
        <ClockAppLogo />
        <Description>
          Minimalistic clock app with alarm clock, stopwatch and timer
        </Description>
      </Card>
      <Card>
        <Title>Clock App</Title>
        <ClockAppLogo />
        <Description>
          Minimalistic clock app with alarm clock, stopwatch and timer
        </Description>
      </Card>
      <Card>
        <Title>Clock App</Title>
        <ClockAppLogo />
        <Description>
          Minimalistic clock app with alarm clock, stopwatch and timer
        </Description>
      </Card>
    </CardList>
  );
}

export default AppCard;
