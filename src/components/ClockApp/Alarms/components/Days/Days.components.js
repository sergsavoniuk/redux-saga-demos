import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media (max-width: 374px) {
    width: 50%;
  }
`;

export const Box = styled.div`
  display: flex;

  @media (max-width: 374px) {
    width: 100%;
    flex-wrap: wrap;
    margin-left: 10px;
  }
`;
