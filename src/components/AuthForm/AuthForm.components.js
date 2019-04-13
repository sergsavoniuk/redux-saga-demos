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
  background-color: #ddc3e20d;
  border: 1px solid #ddc3e2;
  border-radius: 5px;
`;

export const Title = styled.h1`
  margin-top: 0;
  margin-bottom: 50px;
  color: #ddc3e2;
`;

export const ErrorMessage = styled.span`
  display: inline-block;
  width: 100%;
  height: 50px;
  line-height: 50px;
  margin-top: -40px;
  margin-bottom: 10px;
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
  margin-bottom: 15px;
  border: 2px solid #29293f;
  border-radius: 5px;
  outline: none;
  font-size: 1.3em;

  :focus {
    border: 2px solid #ddc3e2;
  }
`;

export const SubmitButton = styled.button.attrs({
  type: 'submit',
})`
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 5px;
  color: #ddc3e2;
  background-color: #29293f;
  padding: 7px 10px 7px 10px;
  font-size: 1.3em;
  outline: none;
  cursor: pointer;

  :hover {
    border: 1px solid #ddc3e2;
  }
`;
