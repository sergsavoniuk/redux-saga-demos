import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > div:not(:last-child) {
    border-bottom: 1px solid #ddc3e2;
  }
`;
