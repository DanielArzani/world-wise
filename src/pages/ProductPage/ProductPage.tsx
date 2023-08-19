import React from 'react';

import Header from '../../components/Header';

import productImage from '../../assets/img-1.jpg';
import styled from 'styled-components';

function ProductPage() {
  return (
    <Wrapper>
      <Header />
      <Main>
        <TextWrapper>
          <H2>About WorldWide.</H2>
          <P>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo est
            dicta illum vero culpa cum quaerat architecto sapiente eius non
            soluta, molestiae nihil laborum, placeat debitis, laboriosam at fuga
            perspiciatis?
          </P>

          <P>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
            doloribus libero sunt expedita ratione iusto, magni, id sapiente
            sequi officiis et.
          </P>
        </TextWrapper>
        <ImageWrapper>
          <img
            src={productImage}
            alt='A man and his two dogs standing at sunset in a barren wilderness, starting at the sun'
            width={'415px'}
          />
        </ImageWrapper>
      </Main>
    </Wrapper>
  );
}

export default ProductPage;

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
  flex-direction: row-reverse;
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
  max-width: 14ch;
`;

const P = styled.p`
  font-size: 1rem;
  font-weight: 500;
  max-width: 42ch;
`;

const ImageWrapper = styled.div``;
