import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProductPage from '../../pages/ProductPage';
import PricingPage from '../../pages/PricingPage';
import HomePage from '../../pages/HomePage';
import NotFoundPage from '../NotFoundPage';
import styled from 'styled-components';
import ApplicationPage from '../../pages/ApplicationPage';
import LoginPage from '../../pages/LoginPage';
import VisitedCities from '../VisitedCities';
import VisitedCountries from '../VisitedCountries';
import CityInfo from '../CityInfo';
import Form from '../Form';

function App() {
  return (
    <Wrapper>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='pricing' element={<PricingPage />} />
          <Route path='product' element={<ProductPage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='app' element={<ApplicationPage />}>
            <Route index element={<Navigate replace to='cities' />} />
            <Route path='cities' element={<VisitedCities />} />
            <Route path='cities/:id' element={<CityInfo />} />

            <Route path='countries' element={<VisitedCountries />} />
            <Route path='form' element={<Form />} />
          </Route>
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
