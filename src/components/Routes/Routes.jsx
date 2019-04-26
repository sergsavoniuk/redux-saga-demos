import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from 'components/Header';
import Loader from 'components/Loader';
import Notification from 'components/Notification';

const HomePage = lazy(() =>
  import(/* webpackChunkName: "HomePage" */ 'components/HomePage'),
);

const ClockApp = lazy(() =>
  import(/* webpackChunkName: "ClockApp" */ 'components/ClockApp/ClockApp'),
);

const CardMemoryGame = lazy(() =>
  import(/* webpackChunkName: "CardMemoryGame" */ 'components/CardMemoryGame'),
);

function Routes() {
  return (
    <Suspense fallback={<Loader />}>
      <Notification />
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/apps/clock" component={ClockApp} />
        <Route path="/apps/card-memory-game" component={CardMemoryGame} />
      </Switch>
    </Suspense>
  );
}

export default Routes;
