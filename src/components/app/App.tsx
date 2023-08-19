import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductPage from '../../pages/ProductPage';
import PricingPage from '../../pages/PricingPage';
import HomePage from '../../pages/HomePage';
import NotFoundPage from '../NotFoundPage';
import styled from 'styled-components';

function App() {
  return (
    <Wrapper>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='pricing' element={<PricingPage />} />
          <Route path='product' element={<ProductPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  height: 100%;
  padding: 1rem 2rem;
`;
