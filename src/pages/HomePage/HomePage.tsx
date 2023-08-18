import React from 'react';

import styled from 'styled-components';
import Header from '../../components/Header';

import bgImage from '../../assets/bg.jpg';

function HomePage() {
  return (
    <Wrapper>
      <Header />
      <main></main>
    </Wrapper>
  );
}

export default HomePage;

const Wrapper = styled.div`
  background-image: linear-gradient(
      rgba(36, 42, 46, 0.8),
      rgba(36, 42, 46, 0.8)
    ),
    url(${bgImage});
  background-size: cover;
  background-position: center;
  min-height: 100%;
`;
