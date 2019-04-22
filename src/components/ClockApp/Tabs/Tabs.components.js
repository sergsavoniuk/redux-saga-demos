import styled, { css } from 'styled-components';

export const Tabs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  margin: 50px 0;
  background-color: #ddc3e20d;
  border: 1px solid #ddc3e2;
  color: #ddc3e2;

  @media (max-width: 410px) {
    width: 95%;
  }
`;

export const TabList = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #29293f;
  border-bottom: 1px solid #ddc3e2;
`;

export const Tab = styled.a`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px;
  text-decoration: none;
  cursor: pointer;

  ${({ active }) =>
    active &&
    css`
      font-weight: bold;
      font-size: 1.5em;
    `}

  &:hover {
    background-color: #0e1427;
  }
`;

export const TabPanels = styled.div`
  width: 100%;
  min-height: 530px;
`;
