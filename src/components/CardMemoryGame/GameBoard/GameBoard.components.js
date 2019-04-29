import styled, { css, keyframes } from 'styled-components';

import { LEVELS } from 'constants/cardGame/levels';

const { Casual, Medium, Hard } = LEVELS;

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - 75px);
  overflow: hidden;
  outline: 0px solid transparent;
`;

export const Board = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  min-height: calc(100vh - 75px);
  margin: 0;
  margin-top: 5px;

  ${props =>
    props.paused &&
    css`
      z-index: 0;
      filter: blur(5px) saturate(0.1);
      opacity: 0.2;
    `}

  & > div {
    ${({ level }) => {
      // eslint-disable-next-line default-case
      switch (level) {
        case Casual:
          return `flex-basis: calc(25% - 2px);`;
        case Medium:
          return `flex-basis: calc(20% - 2px);`;
        case Hard:
          return `flex-basis: calc(12.5% - 2px);`;
      }
    }}
  }
`;

const FlipBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;

  &:hover {
    opacity: 0.8;
  }
`;

export const Front = styled(FlipBox)`
  background-color: #16a085;
`;

export const Back = styled(FlipBox)`
  transform: perspective(1000px) rotateY(180deg);
  background-color: #c0392b;
`;

export const Image = styled.img.attrs(({ name }) => ({
  src: `${process.env.PUBLIC_URL}/images/${name}.png`,
  alt: 'Card image',
}))``;

export const Card = styled.div`
  position: relative;
  margin: 1px;
  background-color: transparent;
  cursor: pointer;

  transition: transform 0.3s;
  transform-style: preserve-3d;

  ${({ visible }) =>
    !visible &&
    css`
      visibility: hidden;
    `}

  ${({ flipped }) =>
    flipped &&
    css`
      transform: perspective(1000px) rotateY(180deg);
    `}
`;

const progressBar = keyframes`
  from {
    width: 0;
  }

  to {
    width: 100%;
  }
`;

export const RemainedTimeProgressBar = styled.div`
  position: absolute;
  top: 0;
  left: 1px;
  width: 0;
  height: 5px;
  background-color: #33b5dc;
  z-index: 2;
  animation: ${({ totalTime }) =>
    css`
      ${progressBar} ${totalTime}ms linear;
    `})}
`;

export const PauseBanner = styled.div`
  position: fixed;
  width: 100%;
  height: 200px;
  margin-top: 100px;
  top: 500px;
  background-color: #c0392b;
  text-align: center;
  z-index: 1;
`;
