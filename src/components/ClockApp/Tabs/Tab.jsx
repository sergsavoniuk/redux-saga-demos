import React from 'react';
import { string, bool, func } from 'prop-types';
import { connect } from 'react-redux';

import { Tab as StyledTab } from './Tabs.components';
import { getActiveTab, changeTab } from 'redux/clock/tabs';

export function Tab({ name: tabName, isActiveTab, changeTab }) {
  function handleTabChange() {
    changeTab(tabName);
  }

  return (
    <StyledTab active={isActiveTab} onClick={handleTabChange}>
      {tabName}
    </StyledTab>
  );
}

Tab.propTypes = {
  name: string.isRequired,
  isActiveTab: bool.isRequired,
  changeTab: func.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    isActiveTab: ownProps.name === getActiveTab(state),
  };
}

export default connect(
  mapStateToProps,
  { changeTab },
)(Tab);
