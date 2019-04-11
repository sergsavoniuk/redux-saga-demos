import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'components/HomePage';
import Header from 'components/Header';

function Routes() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </>
  );
}

export default Routes;
