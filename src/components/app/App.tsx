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
import VisitedCountries from '../VisitedCountries';
import CityInfo from '../CityInfo';
import Form from '../Form';

const BASE_URL = 'http://localhost:3000';

function App() {
  // TODO: Remove this fetch` and the temp data
  const [cityData, setCityData] = useState<CityType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data: CityType[] = await res.json();
        setCityData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
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
            <Route
              index
              element={
                <VisitedCities cityData={cityData} isLoading={isLoading} />
              }
            />
            <Route
              path='cities'
              element={
                <VisitedCities cityData={cityData} isLoading={isLoading} />
              }
            />
            <Route
              path='cities/:id'
              element={<CityInfo oneCityData={cityData} />}
            />

            <Route
              path='countries'
              element={
                <VisitedCountries cityData={cityData} isLoading={isLoading} />
              }
            />
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
