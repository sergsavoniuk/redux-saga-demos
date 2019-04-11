import styled from 'styled-components';

export const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 800px;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  padding: 10px;
  margin-right: 35px;
  margin-bottom: 35px;
  background-color: #ffe47c;
  box-shadow: 0px 0px 5px 5px rgba(86, 59, 64, 1);
  border-radius: 5px;
  cursor: pointer;
`;

export const Title = styled.h1`
  margin-top: 0;
  color: #008080;
`;

export const ClockAppLogo = styled.img.attrs({
  src: `${process.env.PUBLIC_URL}/images/clock.png`,
  alt: 'Clock App Logo',
})``;

export const Description = styled.p`
  color: #008b8b;
  text-align: center;
  font-size: 1.05em;
`;
