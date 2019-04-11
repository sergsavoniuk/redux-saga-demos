import React from 'react';
import { connect } from 'react-redux';

import AppCard from './AppCard';
import { Greeting } from './HomePage.components';
import { getUsername } from 'redux/auth';

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

function mapStateToProps(state) {
  return {
    username: getUsername(state),
  };
}

export default connect(mapStateToProps)(HomePage);
