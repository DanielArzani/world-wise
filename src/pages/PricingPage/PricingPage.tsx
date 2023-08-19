import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';

import pricingImage from '../../assets/img-2.jpg';

function PricingPage() {
  return (
    <Wrapper>
      <Header />
      <Main>
        <TextWrapper>
          <H2>Simple pricing. Just $9/month.</H2>
          <P>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel
            labore mollitia iusto. Recusandae quos provident, laboriosam fugit
            voluptatem iste.
          </P>
        </TextWrapper>
        <ImageWrapper>
          <img
            src={pricingImage}
            alt='The sun rising on a city full of sky scrapers and buildings'
            width={'415px'}
          />
        </ImageWrapper>
      </Main>
    </Wrapper>
  );
}

export default PricingPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;

  background-color: var(--color-dark--1);
  min-height: 100%;
`;

const Main = styled.main`
  display: flex;
  align-items: center;
  gap: 3rem;
  justify-content: center;

  height: 100%;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.875rem;
`;

const H2 = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  line-height: 1.2;
  max-width: 12ch;
`;

const P = styled.p`
  font-size: 1rem;
  font-weight: 500;
  max-width: 42ch;
`;

const ImageWrapper = styled.div``;
