import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { CityProvider } from '../../contexts/CityContext';
import { AuthProvider } from '../../contexts/FakeAuthContext';
import Loader from '../Loader';
import CityInfo from '../CityInfo';
import ErrorBoundary from '../ErrorBoundary';

const ProductPage = lazy(() => import('../../pages/ProductPage'));
const PricingPage = lazy(() => import('../../pages/PricingPage'));
const HomePage = lazy(() => import('../../pages/HomePage'));
const NotFoundPage = lazy(() => import('../NotFoundPage'));
const ApplicationPage = lazy(() => import('../../pages/ApplicationPage'));
const LoginPage = lazy(() => import('../../pages/LoginPage'));
const VisitedCities = lazy(() => import('../VisitedCities'));
const VisitedCountries = lazy(() => import('../VisitedCountries'));
const Form = lazy(() => import('../Form'));
const ProtectedRoutePage = lazy(() => import('../../pages/ProtectedRoutePage'));

function App() {
  return (
    <AuthProvider>
      <CityProvider>
        <Wrapper>
          <BrowserRouter>
            <Suspense fallback={<Loader />}>
              <ErrorBoundary>
                <Routes>
                  <Route path='/' element={<HomePage />} />
                  <Route path='pricing' element={<PricingPage />} />
                  <Route path='product' element={<ProductPage />} />
                  <Route path='login' element={<LoginPage />} />
                  <Route
                    path='app'
                    element={
                      <ProtectedRoutePage>
                        <ApplicationPage />
                      </ProtectedRoutePage>
                    }
                  >
                    <Route index element={<Navigate replace to='cities' />} />
                    <Route path='cities' element={<VisitedCities />} />
                    <Route path='cities/:id' element={<CityInfo />} />
                    <Route path='countries' element={<VisitedCountries />} />
                    <Route path='form' element={<Form />} />
                  </Route>
                  <Route path='*' element={<NotFoundPage />} />
                </Routes>
              </ErrorBoundary>
            </Suspense>
          </BrowserRouter>
        </Wrapper>
      </CityProvider>
    </AuthProvider>
  );
}

export default App;

const Wrapper = styled.div`
  height: 100%;
  padding: 1rem 2rem;
`;
