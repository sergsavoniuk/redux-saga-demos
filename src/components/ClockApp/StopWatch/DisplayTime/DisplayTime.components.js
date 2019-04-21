import styled, { css } from 'styled-components';

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 40px);
  margin: 20px;
  ${({ marginBottom }) =>
    marginBottom &&
    css`
      margin-bottom: 327px;
    `}
`;

export const Total = styled(Box)``;
export const Lap = styled(Box)`
  margin-bottom: 327px;
`;

export const Label = styled.span``;

export const Value = styled.span`
  margin-left: 50px;
  font-family: Digital;
  font-size: 4em;
`;
