import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { CityType } from '../types/City';

type CityContextType = {
  cityData: CityType[];
  setCityData: React.Dispatch<React.SetStateAction<CityType[]>>;
  isLoading: boolean;
  currentCity: CityType | undefined;
  setCurrentCity: React.Dispatch<React.SetStateAction<CityType | undefined>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getCity: (id: number) => Promise<void>;
  createCity: (newCity: CityType) => Promise<void>;
};

const BASE_URL = 'http://localhost:3000';

const CityContext = createContext<CityContextType | null>(null);

type CityProviderProps = {
  children: React.ReactNode;
};

/**
 * Provides information on cities of the CityType as well as the loading state of the fetched cities
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
        const res = await fetch(`${BASE_URL}/cities`, {
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
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

      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      const data: CityType = await res.json();
      setCurrentCity(data);
    } catch (error) {
      if (error) console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Creates a new city
   * @param newCity An object that contains the required data of a city
   */
  const createCity = useCallback(async (newCity: CityType) => {
    try {
      setIsLoading(true);

      const res = await fetch(`${BASE_URL}/cities`, {
        headers: {
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(newCity),
      });
      const data: CityType = await res.json();

      console.log(data);
    } catch (error) {
      if (error) console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // FIXME: React is creating a new object because its deeming that whats being passed in here isn't passing its equality check
  const value = useMemo(
    () => ({
      cityData,
      isLoading,
      currentCity,
      setCurrentCity,
      setIsLoading,
      getCity,
      setCityData,
      createCity,
    }),
    [cityData, isLoading, currentCity, getCity]
  );

  return <CityContext.Provider value={value}>{children}</CityContext.Provider>;
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
