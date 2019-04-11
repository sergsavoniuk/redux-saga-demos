import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from 'components/Header';
import Loader from 'components/Loader';

const HomePage = lazy(() =>
  import(/* webpackChunkName: "HomePage" */ 'components/HomePage'),
);

const ClockApp = lazy(() =>
  import(/* webpackChunkName: "ClockApp" */ 'components/ClockApp/StopWatch'),
);

function Routes() {
  return (
    <Suspense fallback={<Loader />}>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/apps/clock" component={ClockApp} />
      </Switch>
    </Suspense>
  );
}

export default Routes;
