import React, { useState, useMemo } from 'react';
import { connect } from 'react-redux';

import Loader from 'components/Loader';
import { ActionCreators, Selectors } from 'redux/auth';

import {
  Wrapper,
  Form,
  Title,
  Input,
  SubmitButton,
  ErrorMessage,
} from './AuthForm.components';

export function AuthForm({ error, loading, login }) {
  const [username, setUsername] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    login(username.trim());
    setUsername(null);
  }

  function handleChange(event) {
    setUsername(event.target.value);
  }

  const isEmpty = useMemo(() => {
    return username.trim().length === 0;
  }, [username]);

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <Title>Auth Form</Title>
        {error && <ErrorMessage>User with name {error}</ErrorMessage>}
        <Input
          name="username"
          placeholder="Enter your username"
          value={username}
          onChange={handleChange}
        />
        <SubmitButton disabled={loading || isEmpty}>
          {loading ? (
            <Loader alignment="0 auto" size={30} color="#848080" />
          ) : (
            'Continue'
          )}
        </SubmitButton>
      </Form>
    </Wrapper>
  );
}

function mapStateToProps(state) {
  return {
    error: Selectors.getErrorMessage(state),
    loading: Selectors.getLoadingStatus(state),
  };
}

export default connect(
  mapStateToProps,
  {
    login: ActionCreators.login,
  },
)(AuthForm);
