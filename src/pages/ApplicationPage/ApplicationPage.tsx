import React, { createContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../../components/Sidebar';
import Map from '../../components/Map';
import { CityType } from '../../types/City';

const BASE_URL = 'http://localhost:3000';

type CityContextType = {
  cityData: CityType[];
  isLoading: boolean;
};

export const CityContext = createContext<CityContextType | null>(null);

/**
 * The page where the actual application where users can interact with is. Once a user is authenticated, this component will also take care of fetching their data
 */
function ApplicationPage() {
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
    <CityContext.Provider value={{ cityData, isLoading }}>
      <Wrapper className='with-sidebar'>
        <Sidebar />

        <Map />
      </Wrapper>
    </CityContext.Provider>
  );
}

export default ApplicationPage;

const Wrapper = styled.div`
  background-color: var(--color-dark--1);
  min-height: 100%;
`;
