import React from 'react';

import {
  CardList,
  Card,
  StyledLink as Link,
  Title,
  Description,
  ClockAppLogo,
} from './AppCard.components';

function AppCard() {
  return (
    <CardList>
      <Link to="/apps/clock">
        <Card>
          <Title>Clock App</Title>
          <ClockAppLogo />
          <Description>
            Minimalistic clock app with alarm clock, stopwatch and timer
          </Description>
        </Card>
      </Link>

      <Link to="#">
        <Card>
          <Title>Clock App</Title>
          <ClockAppLogo />
          <Description>
            Minimalistic clock app with alarm clock, stopwatch and timer
          </Description>
        </Card>
      </Link>

      <Link to="#">
        <Card>
          <Title>Clock App</Title>
          <ClockAppLogo />
          <Description>
            Minimalistic clock app with alarm clock, stopwatch and timer
          </Description>
        </Card>
      </Link>

      <Link to="#">
        <Card>
          <Title>Clock App</Title>
          <ClockAppLogo />
          <Description>
            Minimalistic clock app with alarm clock, stopwatch and timer
          </Description>
        </Card>
      </Link>
    </CardList>
  );
}

export default AppCard;
