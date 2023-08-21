import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductPage from '../../pages/ProductPage';
import PricingPage from '../../pages/PricingPage';
import HomePage from '../../pages/HomePage';
import NotFoundPage from '../NotFoundPage';
import styled from 'styled-components';
import ApplicationPage from '../../pages/ApplicationPage';
import LoginPage from '../../pages/LoginPage';
import { CityType } from '../../types/City';
import VisitedCities from '../VisitedCities';

function App() {
  // TODO: Remove this fetch
  const [cityData, setCityData] = useState<CityType>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:3000/cities');
      const data: CityType = await res.json();
      setCityData(data);
    })();
  }, []);

  return (
    <Wrapper>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='pricing' element={<PricingPage />} />
          <Route path='product' element={<ProductPage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='app' element={<ApplicationPage />}>
            <Route index element={<VisitedCities cityData={cityData} />} />
            <Route
              path='cities'
              element={<VisitedCities cityData={cityData} />}
            />
            <Route path='countries' element={<p>List of countries</p>} />
            <Route path='form' element={<p>Form</p>} />
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
