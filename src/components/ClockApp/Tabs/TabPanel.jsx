import React, { Suspense, lazy } from 'react';
import { string, bool } from 'prop-types';
import { connect } from 'react-redux';

import Loader from 'components/Loader';
import { getActiveTab } from 'redux/clock/tabs';
import { TabNames } from 'constants/clock/tabNames';

const { Alarms, StopWatch, Timer } = TabNames;

const PAGES = {
  [Alarms]: lazy(() =>
    import(/* webpackChunkName: "Alarms" */ 'components/ClockApp/Alarms'),
  ),
  [StopWatch]: lazy(() =>
    import(/* webpackChunkName: "StopWatch" */ 'components/ClockApp/StopWatch'),
  ),
  [Timer]: lazy(() =>
    import(/* webpackChunkName: "Timer" */ 'components/ClockApp/Timer'),
  ),
};

export function TabPanel({ componentName, isActiveTab }) {
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

TabPanel.propTypes = {
  componentName: string.isRequired,
  isActiveTab: bool.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    isActiveTab: ownProps.componentName === getActiveTab(state),
  };
}

export default connect(mapStateToProps)(TabPanel);
