import styled, { css } from 'styled-components';

export const Board = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  min-height: calc(100vh - 70px);
  margin: 0;
  font-family: Arial;
`;

const FlipBox = styled.div`
  position: absolute;
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
  display: flex;
  justify-content: center;
  align-items: center;
  transform: perspective(1000px) rotateY(180deg);

  ${props =>
    props.isFlipped &&
    css`
      background-color: #c0392b;
    `}
`;

export const Card = styled.div`
  position: relative;
  margin: 1px;
  background-color: transparent;
  cursor: pointer;

  transition: transform 0.7s;
  transform-style: preserve-3d;

  ${props =>
    props.isGuessed &&
    css`
      visibility: hidden;
    `}

  ${props => {
    const level = props.level;

    // eslint-disable-next-line default-case
    switch (level) {
      case 'casual':
        return css`
          flex-basis: calc(25% - 2px);
        `;
      case 'medium':
        return css`
          flex-basis: calc(20% - 2px);
        `;
      case 'hard':
        return css`
          flex-basis: calc(12.5% - 2px);
        `;
    }
  }}

  ${props =>
    props.isFlipped &&
    css`
      transform: perspective(1000px) rotateY(180deg);
    `}

`;
