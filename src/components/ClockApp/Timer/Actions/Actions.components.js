import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #29293f;
  border-top: 1px solid #ddc3e2;
`;

export const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 10px;
  border: none;
  background-color: transparent;
  color: #ddc3e2;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #0e1427;
  }
`;

export const ResetIcon = styled.img.attrs({
  src: `${process.env.PUBLIC_URL}/images/reset_icon.png`,
  alt: 'Reset icon',
})``;

export const StartStopIcon = styled.img.attrs({
  src: `${process.env.PUBLIC_URL}/images/start-stop_icon.png`,
  alt: 'Start/Stop icon',
})``;

export const ResetButton = styled(Button)`
  ${({ disabled }) =>
    disabled &&
    css`
      background-color: #ffffff1a;
      cursor: not-allowed;

      &:hover {
        background-color: #ffffff1a;
      }
    `}
`;

export const StartStopButton = styled(Button)``;
