import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const CardList = styled.div`
  width: 80%;
  display: grid;
  grid-gap: 35px;
  grid-template-columns: repeat(auto-fill, 300px);
  justify-content: center;

  margin-bottom: 35px;

  @media (max-width: 1440px) {
    width: 90%;
  }

  @media (max-width: 320px) {
    grid-template-columns: repeat(auto-fill, 290px);
  }
`;

export const Card = styled.div`
  display: grid;
  justify-items: center;
  padding: 10px;
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
  font-size: 1.25em;
  font-style: italic;
  letter-spacing: 0.8px;
`;
