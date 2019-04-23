import styled from 'styled-components';

export const Notification = styled.div`
  width: 300px;
  color: #000;
`;

export const Title = styled.h3`
  margin: 0;
  padding: 10px;
  background-color: #1f8002;
  color: #fff;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

export const Body = styled.p`
  margin: 0;
  padding: 20px 10px;
  background-color: #fff;
  font-size: 1.05em;
`;

export const CloseButton = styled.button`
  width: 100%;
  border: none;
  border-top: 1px solid #a9a9a9;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: #d8d6d5;
  padding: 15px 10px;
  font-size: 1.05em;
  outline: none;
  cursor: pointer;

  :hover {
    border-top: 1px solid #a0a0a0;
    background-color: #a0a0a0;
  }
`;
