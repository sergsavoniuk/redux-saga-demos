import styled, { keyframes } from 'styled-components';

const fadeInAndOut = keyframes`
  100% {
    opacity: 0;
  }
  0%, 80% {
    opacity: 1;
  }
`;

export const Notification = styled.div`
  position: absolute;
  top: 50px;
  right: 20px;
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 5px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  color: #4c4c4c;
  z-index: 1000;
  /* animation: ${fadeInAndOut} 4s ease-in-out; */
  animation-name: ${fadeInAndOut};
  animation-duration: 2s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: 1
`;

const Text = styled.p`
  margin: 0;
  padding: 3px;
`;

export const Title = styled(Text)``;

export const Body = styled(Text)`
  font-size: 0.9em;
`;
