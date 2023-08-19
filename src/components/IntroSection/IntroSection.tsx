import React from 'react';
import ButtonLogin from '../ButtonLogin';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function IntroSection() {
  return (
    <Wrapper>
      <H2>You travel the world. WorldWise keeps track of your adventures.</H2>
      <P>
        A world map that tracks your footsteps into every city you can think of.
        Never forget your wonderful experiences, and show your friends how you
        have wandered the world.
      </P>
      <ButtonLogin>
        <Link to={'app'}>Start Tracking Now</Link>
      </ButtonLogin>
    </Wrapper>
  );
}

export default IntroSection;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
`;

const H2 = styled.h2`
  font-size: 2.8125rem;
  font-weight: bold;
  line-height: 1.3;
  text-align: center;
  max-width: 23ch;
`;

const P = styled.p`
  color: var(--color-light--1);
  font-size: 1.1875rem;
  margin-bottom: 2.5rem;
  max-width: 94ch;
  text-align: center;
`;
