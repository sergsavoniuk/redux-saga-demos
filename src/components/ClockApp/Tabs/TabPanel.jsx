import React, { Suspense, useEffect, useRef, lazy } from 'react';
import { connect } from 'react-redux';

import Loader from 'components/Loader';
import { getActiveTab } from 'redux/clock/tabs';

const PAGES = {
  // 'alarm': lazy(() =>
  //   import(/* webpackChunkName: "Alarm" */ 'components/CurrentForecast'),
  // ),
  StopWatch: lazy(() =>
    import(/* webpackChunkName: "StopWatch" */ 'components/ClockApp/StopWatch'),
  ),
  Timer: lazy(() =>
    import(/* webpackChunkName: "Timer" */ 'components/ClockApp/Timer'),
  ),
};

export function TabPanel({ name: componentName, isActiveTab }) {
  if (isActiveTab) {
    const Page = PAGES[componentName];

    return (
      <Suspense falback={<Loader />}>
        <Page />
      </Suspense>
    );
  }
  return null;
}

function mapStateToProps(state, ownProps) {
  return {
    isActiveTab: ownProps.name === getActiveTab(state),
  };
}

export default connect(mapStateToProps)(TabPanel);
