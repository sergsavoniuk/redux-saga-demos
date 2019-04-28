import styled, { css } from 'styled-components';

import { LEVELS } from 'constants/cardGame/levels';

const { Casual, Medium, Hard } = LEVELS;

export const Board = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  min-height: calc(100vh - 70px);
  margin: 0;

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

export const Card = styled.div`
  position: relative;
  margin: 1px;
  background-color: transparent;
  cursor: pointer;

  transition: transform 0.7s;
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
