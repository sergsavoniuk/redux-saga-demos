import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  min-height: 80px;
  padding: 5px;
  background-color: #333333;
`;

export const LogoutButton = styled.button`
  height: 40px;
  border: none;
  border-radius: 5px;
  color: #fff;
  background-color: #00d2da;
  padding: 7px 10px 7px 10px;
  font-size: 1.3em;
  outline: none;
  cursor: pointer;
`;

export const UserInfo = styled.button`
  display: flex;
  align-items: center;
  color: #fff;
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
`;

export const Avatar = styled.img.attrs({
  src:
    'http://gravatar.com/avatar/72887e772aa84fd2bce45f46debb7b1f.png?s=40&d=mp',
  alt: 'Image of user',
})`
  border-radius: 50%;
  margin-left: 10px;
  height: 40px;
`;

export const Login = styled.span`
  font-size: 1.2em;
`;
