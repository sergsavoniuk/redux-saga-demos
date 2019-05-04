import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  min-height: 70px;
  padding: 5px;
  background-color: #ffffff1a;
`;

export const UserInfoLink = styled.a`
  display: flex;
  align-items: center;
  color: #fff;
  background-color: transparent;
  border: 0;
  outline: none;
  cursor: pointer;
`;

export const Avatar = styled.img.attrs({
  src:
    'http://gravatar.com/avatar/72887e772aa84fd2bce45f46debb7b1f.png?s=40&d=mp',
  alt: 'Image of user',
})`
  border-radius: 50%;
  margin-left: 10px;
  width: 40px;
  height: 40px;
`;

export const Login = styled.span`
  font-size: 1.3em;
  ::after {
    margin-left: 5px;
    font-size: 0.7em;
    content: '▼';
  }
`;

export const Dropdown = styled.ul`
  position: absolute;
  top: 70px;
  right: 0;
  width: 160px;
  background-color: #0e1427;
  border: 1px solid #ddc3e2;
  color: #fff;
  list-style-type: none;
  margin: 0;
  padding: 0;
  z-index: 1 !important;
`;

export const DropdownItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  font-size: 1.1em;
  cursor: pointer;

  &:hover {
    background-color: #ddc3e20d;
    color: #ddc3e2;
  }
`;

export const LogoutIcon = styled.img.attrs({
  src: `${process.env.PUBLIC_URL}/images/logout_icon.png`,
  alt: 'Logout icon',
})`
  width: 26px;
  height: 26px;
`;
