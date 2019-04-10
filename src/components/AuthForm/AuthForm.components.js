import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  min-height: 80vh;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 15px;
  background-color: #ffe47c;
  box-shadow: 0px 0px 10px 10px rgba(86, 59, 64, 1);
  border-radius: 5px;
`;

export const Title = styled.h1`
  margin-top: 0;
  color: #117065;
`;

export const ErrorMessage = styled.span`
  display: inline-block;
  width: 100%;
  padding: 10px;
  text-align: center;
  background-color: #d57369;
  border-radius: 5px;
  font-size: 1.2em;
`;

export const Input = styled.input`
  width: 100%;
  height: 50px;
  padding: 7px 10px 7px 10px;
  margin: 5px;
  border: 2px solid #9b9b9b;
  border-radius: 5px;
  outline: none;
  font-size: 1.3em;
`;

export const SubmitButton = styled.button.attrs({
  type: 'submit',
})`
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 5px;
  color: #fff;
  background-color: #00d2da;
  padding: 7px 10px 7px 10px;
  font-size: 1.3em;
  outline: none;
  cursor: pointer;
`;
