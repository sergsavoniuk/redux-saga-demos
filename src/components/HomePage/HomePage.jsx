import React from 'react';
import { string } from 'prop-types';
import { connect } from 'react-redux';

import AppCard from './AppCard';
import { Greeting } from './HomePage.components';
import { Selectors } from 'redux/auth';

export function HomePage({ username }) {
  return (
    <>
      <Greeting>
        Hi, {username}!<br /> Here you can view available apps.
      </Greeting>
      <AppCard />
    </>
  );
}

HomePage.propTypes = {
  username: string.isRequired,
};

function mapStateToProps(state) {
  return {
    username: Selectors.getUsername(state),
  };
}

export default connect(mapStateToProps)(HomePage);
