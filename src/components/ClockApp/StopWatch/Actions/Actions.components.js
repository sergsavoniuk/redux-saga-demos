import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #c4c4c4;
`;

export const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 10px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  outline: none;
`;

export const ResetIcon = styled.img.attrs({
  src: `${process.env.PUBLIC_URL}/images/reset_icon.png`,
  alt: 'Reset icon',
})``;

export const LapIcon = styled.img.attrs({
  src: `${process.env.PUBLIC_URL}/images/lap_icon.png`,
  alt: 'Lap icon',
})``;

export const StartStopIcon = styled.img.attrs({
  src: `${process.env.PUBLIC_URL}/images/start-stop_icon.png`,
  alt: 'Start/Stop icon',
})``;

export const ResetButton = styled(Button)``;

export const LapButton = styled(Button)``;

export const StartStopButton = styled(Button)``;