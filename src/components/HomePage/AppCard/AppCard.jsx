import React from 'react';

import {
  CardList,
  Card,
  StyledLink as Link,
  Title,
  Description,
  Logo,
} from './AppCard.components';

function AppCard() {
  return (
    <CardList>
      <Link to="/apps/clock">
        <Card>
          <Title>Clock App</Title>
          <Logo name="clock" alt="Clock App Logo" />
          <Description>
            Minimalistic clock app with alarm clock, stopwatch and timer
          </Description>
        </Card>
      </Link>

      <Link to="#">
        <Card>
          <Title>Next App</Title>
          <Logo name="question" alt="Next App Logo" />
          <Description>Coming soon ...</Description>
        </Card>
      </Link>

      <Link to="#">
        <Card>
          <Title>Next App</Title>
          <Logo name="question" alt="Next App Logo" />
          <Description>Coming soon ...</Description>
        </Card>
      </Link>

      <Link to="#">
        <Card>
          <Title>Next App</Title>
          <Logo name="question" alt="Next App Logo" />
          <Description>Coming soon ...</Description>
        </Card>
      </Link>
    </CardList>
  );
}

export default AppCard;
