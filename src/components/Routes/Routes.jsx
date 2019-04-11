import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from 'components/Header';
import Loader from 'components/Loader';

const HomePage = lazy(() =>
  import(/* webpackChunkName: "HomePage" */ 'components/HomePage'),
);

function Routes() {
  return (
    <Suspense fallback={<Loader />}>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </Suspense>
  );
}

export default Routes;
