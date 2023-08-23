import React, { createContext, useContext, useEffect, useState } from 'react';
import { CityType } from '../types/City';

type CityContextType = {
  cityData: CityType[];
  isLoading: boolean;
};

const BASE_URL = 'http://localhost:3000';

const CityContext = createContext<CityContextType | null>(null);

type CityProviderProps = {
  children: React.ReactNode;
};

/**
 * Provides an array of the the CityType as well as the loading state of the fetched cities
 * @param children The components that should be able to use this data
 */
function CityProvider({ children }: CityProviderProps) {
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
      {children}
    </CityContext.Provider>
  );
}

/**
 * The list of visited cities as well as the current loading state
 */
function useCity() {
  const context = useContext(CityContext);
  if (context == null) {
    throw new Error('useCity must be used within the children of CityProvider');
  }

  return context;
}

export { CityProvider, useCity };
