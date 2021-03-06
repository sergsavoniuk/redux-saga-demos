import React, { useState } from 'react';
import { string, func } from 'prop-types';
import { connect } from 'react-redux';

import {
  Header as StyledHeader,
  UserInfoLink,
  Avatar,
  Login,
  Dropdown,
  DropdownItem,
  LogoutIcon,
} from './Header.components';
import { ActionCreators, Selectors } from 'redux/auth';

export function Header({ username, logout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <>
      <StyledHeader>
        <UserInfoLink onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <Login>{username}</Login>
          <Avatar />
        </UserInfoLink>
      </StyledHeader>
      {isDropdownOpen && (
        <Dropdown>
          <DropdownItem onClick={logout}>
            Logout <LogoutIcon />
          </DropdownItem>
        </Dropdown>
      )}
    </>
  );
}

Header.propTypes = {
  username: string.isRequired,
  logout: func.isRequired,
};

function mapStateToProps(state) {
  return {
    username: Selectors.getUsername(state),
  };
}

export default connect(
  mapStateToProps,
  { logout: ActionCreators.logout },
)(Header);
