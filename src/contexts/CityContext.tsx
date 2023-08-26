import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { CityType } from '../types/City';

type CityContextType = {
  cityData: CityType[];
  setCityData: (cities: CityType[]) => void;
  isLoading: boolean;
  currentCity: CityType | undefined;
  setCurrentCity: (city?: CityType) => void;
  setIsLoading: (loading: boolean) => void;
  getCity: (id: number) => Promise<void>;
  createCity: (newCity: CityType) => Promise<void>;
  deleteCity: (id: number) => Promise<void>;
};

const BASE_URL = 'http://localhost:3000';

const CityContext = createContext<CityContextType | null>(null);

type State = {
  cityData: CityType[];
  isLoading: boolean;
  currentCity?: CityType;
  error: string | null;
};

const initialState: State = {
  cityData: [],
  isLoading: false,
  currentCity: undefined,
  error: null,
};

type Action =
  | { type: 'loading'; payload: boolean }
  | { type: 'cities/loaded'; payload: CityType[] }
  | { type: 'city/loaded'; payload: CityType | undefined }
  | { type: 'city/created'; payload: CityType }
  | { type: 'city/deleted'; payload: number }
  | { type: 'rejected'; payload: string }
  | { type: 'clear_rejected' };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };

    case 'cities/loaded':
      return { ...state, cityData: action.payload, isLoading: false };

    case 'city/loaded':
      return { ...state, currentCity: action.payload, isLoading: false };

    case 'city/created':
      return {
        ...state,
        cityData: [...state.cityData, action.payload],
        isLoading: false,
        currentCity: action.payload,
      };

    case 'city/deleted':
      return {
        ...state,
        cityData: state.cityData.filter((city) => city.id !== action.payload),
        isLoading: false,
        currentCity: undefined,
      };

    case 'rejected':
      return { ...state, error: action.payload, isLoading: false };

    case 'clear_rejected':
      return { ...state, error: null };

    default:
      return state;
  }
}

type CityProviderProps = {
  children: React.ReactNode;
};

/**
 * Provides information on cities of the CityType as well as the loading state of the fetched cities
 * @param children The components that should be able to use this data
 */
function CityProvider({ children }: CityProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      try {
        dispatch({ type: 'loading', payload: true });
        const res = await fetch(`${BASE_URL}/cities`, {
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
        const data: CityType[] = await res.json();
        dispatch({ type: 'cities/loaded', payload: data });
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);
          dispatch({ type: 'rejected', payload: error.message });
        }
      }
    })();
  }, []);

  /**
   * Fetches for a specific city. Its memoized so that its not regenerated on every render when called by a useEffect hook causing an infinite loop
   * @param id The id of a specific city
   */
  const getCity = useCallback(
    async (id: number) => {
      // there's no need to call the api again if the id is already that of the currentCity
      if (Number(id) === state.currentCity?.id) return;

      try {
        dispatch({ type: 'loading', payload: true });
        const res = await fetch(`${BASE_URL}/cities/${id}`, {
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
        const data: CityType = await res.json();
        dispatch({ type: 'city/loaded', payload: data });
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);
          dispatch({ type: 'rejected', payload: error.message });
        }
      }
    },
    [state.currentCity]
  );

  /**
   * Creates a new city
   * @param newCity An object that contains the required data of a city
   */
  const createCity = useCallback(
    async (newCity: CityType) => {
      try {
        dispatch({ type: 'loading', payload: true });
        const res = await fetch(`${BASE_URL}/cities`, {
          headers: {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(newCity),
        });
        const data: CityType = await res.json();
        dispatch({ type: 'cities/loaded', payload: [...state.cityData, data] });
        dispatch({ type: 'city/loaded', payload: data });
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);
          dispatch({ type: 'rejected', payload: error.message });
        }
      }
    },
    [state.cityData]
  );

  /**
   * Deletes a city and updates the state to reflect it
   * @param id The unique id of the city to be deleted
   */
  const deleteCity = useCallback(
    async (id: number) => {
      try {
        dispatch({ type: 'loading', payload: true });
        // Make a DELETE request to delete the city on the backend
        const res = await fetch(`${BASE_URL}/cities/${id}`, {
          headers: {
            'Cache-Control': 'no-cache',
          },
          method: 'DELETE',
        });

        // Check if the request was successful
        if (res.status === 200) {
          dispatch({ type: 'city/deleted', payload: id });

          // If the currentCity is the deleted one, reset currentCity
          if (state.currentCity?.id === id) {
            dispatch({ type: 'city/loaded', payload: undefined });
          }
        } else {
          console.error('Failed to delete city. Status:', res.status);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);
          dispatch({ type: 'rejected', payload: error.message });
        }
      }
    },
    [state.currentCity]
  );

  // clears the error from the state when called
  const clearError = () => {
    dispatch({ type: 'clear_rejected' });
  };

  // FIXME: React is creating a new object because its deeming that whats being passed in here isn't passing its equality check
  const value = useMemo(
    () => ({
      cityData: state.cityData,
      isLoading: state.isLoading,
      currentCity: state.currentCity,
      setCurrentCity: (city?: CityType) =>
        dispatch({ type: 'city/loaded', payload: city }),
      setIsLoading: (loading: boolean) =>
        dispatch({ type: 'loading', payload: loading }),
      getCity,
      setCityData: (cities: CityType[]) =>
        dispatch({ type: 'cities/loaded', payload: cities }),
      createCity,
      deleteCity,
      error: state.error,
      clearError,
    }),
    [state, getCity, createCity, deleteCity]
  );

  return <CityContext.Provider value={value}>{children}</CityContext.Provider>;
}

/**
 * Provides access to the CityContext. When called, this hook returns:
 * - cityData: An array of cities (CityType[]).
 * - setCityData: The setter function for the cityData.
 * - isLoading: A boolean indicating whether the data is loading.
 * - setIsLoading: Setter function for isLoading.
 * - currentCity: The currently selected city.
 * - setCurrentCity: A setter function for the currentCity.
 * - getCity: Function that fetches a city based on the id.
 * - createCity: A function that creates a new city and adds it to the list of cities.
 * - deleteCity: Function that deletes a city based on its id.
 * - error: The error state showing any errors that occurred.
 * - clearError: Function to clear any errors.
 */
function useCity() {
  const context = useContext(CityContext);
  if (context == null) {
    throw new Error('useCity must be used within the children of CityProvider');
  }

  return context;
}

export { CityProvider, useCity };
