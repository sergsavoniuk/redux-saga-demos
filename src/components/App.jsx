import React, { useEffect } from 'react';
import { bool, func } from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import Routes from 'components/Routes';
import Layout from 'components/Layout';
import AuthForm from 'components/AuthForm';
import Loader from 'components/Loader';
import { ActionCreators, Selectors } from 'redux/auth';

function getUsername() {
  return localStorage.getItem('username');
}

function App({ isAuthenticated, login, push }) {
  useEffect(() => {
    const username = getUsername();
    if (!isAuthenticated) {
      push('/auth');
      if (username != null) {
        login(username);
      }
    }
  }, [isAuthenticated]);

  let Component;
  if (!isAuthenticated) {
    Component = getUsername() != null ? <Loader /> : <AuthForm />;
  } else {
    Component = <Routes />;
  }

  return <Layout>{Component}</Layout>;
}

App.propTypes = {
  isAuthenticated: bool.isRequired,
  login: func.isRequired,
  push: func.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: Selectors.getIsAuthenticated(state),
  };
}

export default connect(
  mapStateToProps,
  { login: ActionCreators.login, push },
)(App);
