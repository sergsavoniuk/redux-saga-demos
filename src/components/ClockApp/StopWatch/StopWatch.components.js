import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin-top: 50px;
  background-color: #b7f4fa;
  box-shadow: 0px 0px 10px 10px rgba(86, 59, 64, 1);
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 40px);
  margin: 20px;
`;

export const Total = styled(Box)``;
export const Lap = styled(Box)``;

export const Label = styled.span``;

export const Value = styled.span`
  margin-left: 50px;
  font-size: 1.8em;
`;
