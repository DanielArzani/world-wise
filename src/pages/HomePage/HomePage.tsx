import React from 'react';

import styled from 'styled-components';
import Header from '../../components/Header';

import bgImage from '../../assets/bg.jpg';
import IntroSection from '../../components/IntroSection';

/**
 * The layout for the navbar and logo as well as what the app is about and a buttons to log in.
 */
function HomePage() {
  return (
    <Wrapper>
      <Header />
      <Main>
        <IntroSection />
      </Main>
    </Wrapper>
  );
}

export default HomePage;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: max-content 100px 1fr;

  & > :first-child {
    grid-row: 1/2;
  }

  & > :last-child {
    grid-row: 3/4;
  }

  background-image: linear-gradient(
      rgba(36, 42, 46, 0.8),
      rgba(36, 42, 46, 0.8)
    ),
    url(${bgImage});
  background-size: cover;
  background-position: center;
  min-height: 100%;
`;

const Main = styled.main`
  padding-inline: 0.5rem;
`;
