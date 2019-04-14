import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin-top: 50px;
  background-color: #ddc3e20d;
  border: 1px solid #ddc3e2;
  color: #ddc3e2;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 40px);
  margin: 20px;
`;

export const Total = styled(Box)``;
export const Lap = styled(Box)`
  margin-bottom: 330px;
`;

export const Label = styled.span``;

export const Value = styled.span`
  margin-left: 50px;
  font-size: 1.8em;
`;
