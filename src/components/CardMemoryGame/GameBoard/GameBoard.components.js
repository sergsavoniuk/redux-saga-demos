import styled, { css } from 'styled-components';

export const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  min-height: calc(100vh - 70px);
  margin: 0;
  font-family: Arial;
`;

export const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1px;
  background-color: #16a085;
  cursor: pointer;

  transition-duration: 400ms;
  transition-property: transform;

  &:hover {
    opacity: 0.8;
  }

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
    props.flipped &&
    css`
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      width: calc(100% - 2px);
      padding: 0;
      padding: 0 10px;
      background-color: #c0392b;
      font-family: 'Open Sans';
      font-size: 0.85em;
      letter-spacing: 0.8px;
      font-weight: normal;
      transform: rotate(360deg);

      & > p {
        padding: 0;
        margin: 4px 0;
      }

      &:hover {
        opacity: 1;
      }
    `}
`;
