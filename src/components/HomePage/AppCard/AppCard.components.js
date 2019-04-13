import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
  background-color: #29293f;
  border: 1px solid #ddc3e2;
  border-radius: 5px;
  cursor: pointer;

  :hover {
    background-color: #ddc3e20d;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
`;

export const Title = styled.h2`
  margin-top: 0;
  color: #ddc3e2;
`;

export const ClockAppLogo = styled.img.attrs({
  src: `${process.env.PUBLIC_URL}/images/clock.png`,
  alt: 'Clock App Logo',
})``;

export const Description = styled.p`
  color: #ddc3e2;
  text-align: center;
  font-size: 1.05em;
`;
