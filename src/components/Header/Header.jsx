import React from 'react';
import { connect } from 'react-redux';

import {
  Header as StyledHeader,
  UserInfo,
  Avatar,
  Login,
  LogoutButton,
} from './Header.components';
import { logout, getUsername } from 'redux/auth';

export function Header({ username, logout }) {
  return (
    <StyledHeader>
      <UserInfo>
        <Login>{username}</Login>
        <Avatar />
      </UserInfo>
      <LogoutButton onClick={logout}>Logout</LogoutButton>
    </StyledHeader>
  );
}

function mapStateToProps(state) {
  return {
    username: getUsername(state),
  };
}

export default connect(
  mapStateToProps,
  { logout },
)(Header);
