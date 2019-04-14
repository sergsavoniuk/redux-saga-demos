import React, { Suspense, useEffect, useRef, lazy } from 'react';
import { connect } from 'react-redux';

import Loader from 'components/Loader';
import { getActiveTab } from 'redux/clock/tabs';

const PAGES = {
  // 'alarm': lazy(() =>
  //   import(/* webpackChunkName: "Alarm" */ 'components/CurrentForecast'),
  // ),
  stopwatch: lazy(() =>
    import(/* webpackChunkName: "StopWatch" */ 'components/ClockApp/StopWatch'),
  ),
  // 'timer': lazy(() =>
  //   import(/* webpackChunkName: "Timer" */ 'components/ForecastFor5Days'),
  // ),
};

export function TabPanel({ name: componentName, isActiveTab }) {
  const Page = PAGES['stopwatch'];

  return (
    <Suspense falback={<Loader />}>
      <Page />
    </Suspense>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    isActiveTab: ownProps.name === getActiveTab(state),
  };
}

export default connect(mapStateToProps)(TabPanel);
