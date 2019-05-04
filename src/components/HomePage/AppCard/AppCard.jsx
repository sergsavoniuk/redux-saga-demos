import React from 'react';

import {
  CardList,
  Card,
  StyledLink as Link,
  Title,
  Description,
  Logo,
} from './AppCard.components';
import { ROUTES } from 'constants/routes';

const { ClockApp, CardGameApp } = ROUTES;

function AppCard() {
  return (
    <CardList>
      <Link to={ClockApp}>
        <Card>
          <Title>Clock App</Title>
          <Logo name="clock" alt="Clock App Logo" />
          <Description>
            Minimalistic clock app with alarm clock, stopwatch and timer
          </Description>
        </Card>
      </Link>

      <Link to={CardGameApp.Root}>
        <Card>
          <Title>Card Memory Game</Title>
          <Logo name="card-game" alt="Card Memory Game Logo" />
          <Description>
            A game where you have to click on a card to see what image is
            underneath it and try to find the matching image underneath the
            other cards
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
    </CardList>
  );
}

export default AppCard;
