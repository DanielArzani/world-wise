import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { CityType } from '../types/City';

type CityContextType = {
  cityData: CityType[];
  isLoading: boolean;
  currentCity: CityType | undefined;
  setCurrentCity: React.Dispatch<React.SetStateAction<CityType | undefined>>;
  getCity: (id: number) => Promise<void>;
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
  const [currentCity, setCurrentCity] = useState<CityType | undefined>();

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

  /**
   * Fetches for a specific city. Its memoized so that its not regenerated on every render when called by a useEffect hook causing an infinite loop
   * @param id The id of a specific city
   */
  const getCity = useCallback(async (id: number) => {
    try {
      setIsLoading(true);
      setCurrentCity(undefined); // In order to avoid stale values when there's a delay in the HTTP Request
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data: CityType = await res.json();
      setCurrentCity(data);
    } catch (error) {
      if (error) console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <CityContext.Provider
      value={{ cityData, isLoading, currentCity, setCurrentCity, getCity }}
    >
      {children}
    </CityContext.Provider>
  );
}

/**
 * Provides access to the CityContext. When called, this hook returns:
 * - cityData: An array of cities (CityType[]).
 * - isLoading: A boolean indicating whether the data is loading.
 * - currentCityId: The ID of the current city.
 * - setCurrentCityId: A setter function for updating the current city ID.
 * - GetCity: Function that will get a city based on the id
 */
function useCity() {
  const context = useContext(CityContext);
  if (context == null) {
    throw new Error('useCity must be used within the children of CityProvider');
  }

  return context;
}

export { CityProvider, useCity };
