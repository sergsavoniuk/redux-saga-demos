import React, { Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from 'components/Header';
import Loader from 'components/Loader';
import Notification from 'components/Notification';
import { ROUTES as RoutePathes } from 'constants/routes';

const { Home, ClockApp: Clock, CardGameApp } = RoutePathes;

const HomePage = lazy(() =>
  import(/* webpackChunkName: "HomePage" */ 'components/HomePage'),
);

const ClockApp = lazy(() =>
  import(/* webpackChunkName: "ClockApp" */ 'components/ClockApp/ClockApp'),
);

const CardMemoryGame = lazy(() =>
  import(/* webpackChunkName: "CardMemoryGame" */ 'components/CardMemoryGame'),
);

const CardMemoryGameBoard = lazy(() =>
  import(/* webpackChunkName: "CardMemoryGameBoard" */ 'components/CardMemoryGame/GameBoard'),
);

function Routes() {
  return (
    <Suspense fallback={<Loader />}>
      <Notification />
      <Header />
      <Switch>
        <Route exact path={Home} component={HomePage} />
        <Route path={Clock} component={ClockApp} />
        <Route exact path={CardGameApp.Root} component={CardMemoryGame} />
        <Route path={CardGameApp.Play} component={CardMemoryGameBoard} />
        <Redirect to={Home} component={HomePage} />
      </Switch>
    </Suspense>
  );
}

export default Routes;
