import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TimeInput = styled.input`
  display: flex;
  justify-content: center;
  width: 65px;
  height: 50px;
  line-height: 50px;
  padding: 7px 10px 7px 10px;
  margin: 5px;
  margin-top: 30px;
  margin-bottom: 5px;
  border: 2px solid #666666;
  border-radius: 5px;
  outline: none;
  font-family: Digital;
  font-size: 2.5em;

  :focus {
    border: 2px solid #ddc3e2;
  }

  @media (max-width: 410px) {
    width: 55px;
    margin-right: 1px;
    margin-left: 5px;
    font-size: 2em;
  }
`;

export const Box = styled.div`
  display: flex;
  align-items: center;
`;

export const Separator = styled.span`
  font-size: 2.5em;
`;
