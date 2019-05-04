import styled, { css } from 'styled-components';

export const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 500px;
  height: 500px;
  margin-top: 100px;
  font-family: Arial;

  @media (max-width: 499px) {
    width: 95%;
  }
`;

export const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(50% - 2px);
  height: 50%;
  margin: 1px;
  padding: 70px 0;
  background-color: #16a085;
  color: #fff;
  font-size: 3em;
  font-weight: bold;
  cursor: pointer;

  transition-duration: 400ms;
  transition-property: transform;

  &:hover {
    opacity: .8;
  }

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

  ${props =>
    props.fixed === true &&
    css`
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 0;
      background-color: #c0392b;

      &:hover {
        opacity: 1;
      }
    `}

  ${props =>
    props.active === false &&
    css`
      background-color: #c0392b;
      transform: rotateY(180deg);

      &:hover {
        opacity: 1;
      }
    `}


`;
