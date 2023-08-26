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
  | { type: 'SET_CITIES'; payload: CityType[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_CURRENT_CITY'; payload: CityType | undefined }
  | { type: 'ADD_CITY'; payload: CityType }
  | { type: 'DELETE_CITY'; payload: number }
  | { type: 'ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    case 'SET_CITIES':
      return { ...state, cityData: action.payload };

    case 'SET_CURRENT_CITY':
      return { ...state, currentCity: action.payload };

    case 'ADD_CITY':
      return { ...state, cityData: [...state.cityData, action.payload] };

    case 'DELETE_CITY':
      return {
        ...state,
        cityData: state.cityData.filter((city) => city.id !== action.payload),
      };

    case 'ERROR':
      return { ...state, error: action.payload };

    case 'CLEAR_ERROR':
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
        dispatch({ type: 'SET_LOADING', payload: true });
        const res = await fetch(`${BASE_URL}/cities`, {
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
        const data: CityType[] = await res.json();
        dispatch({ type: 'SET_CITIES', payload: data });
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);
          dispatch({ type: 'ERROR', payload: error.message });
        }
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    })();
  }, []);

  /**
   * Fetches for a specific city. Its memoized so that its not regenerated on every render when called by a useEffect hook causing an infinite loop
   * @param id The id of a specific city
   */
  const getCity = useCallback(async (id: number) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      const data: CityType = await res.json();
      dispatch({ type: 'SET_CURRENT_CITY', payload: data });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        dispatch({ type: 'ERROR', payload: error.message });
      }
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  /**
   * Creates a new city
   * @param newCity An object that contains the required data of a city
   */
  const createCity = useCallback(
    async (newCity: CityType) => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });

        const res = await fetch(`${BASE_URL}/cities`, {
          headers: {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(newCity),
        });
        const data: CityType = await res.json();
        dispatch({ type: 'SET_CITIES', payload: [...state.cityData, data] });
        dispatch({ type: 'SET_CURRENT_CITY', payload: data });
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);
          dispatch({ type: 'ERROR', payload: error.message });
        }
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
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
        dispatch({ type: 'SET_LOADING', payload: true });

        // Make a DELETE request to delete the city on the backend
        const res = await fetch(`${BASE_URL}/cities/${id}`, {
          headers: {
            'Cache-Control': 'no-cache',
          },
          method: 'DELETE',
        });

        // Check if the request was successful
        if (res.status === 200) {
          dispatch({ type: 'DELETE_CITY', payload: id });

          // If the currentCity is the deleted one, reset currentCity
          if (state.currentCity?.id === id) {
            dispatch({ type: 'SET_CURRENT_CITY', payload: undefined });
          }
        } else {
          console.error('Failed to delete city. Status:', res.status);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);
          dispatch({ type: 'ERROR', payload: error.message });
        }
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },
    [state.currentCity]
  );

  // clears the error from the state when called
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // FIXME: React is creating a new object because its deeming that whats being passed in here isn't passing its equality check
  const value = useMemo(
    () => ({
      cityData: state.cityData,
      isLoading: state.isLoading,
      currentCity: state.currentCity,
      setCurrentCity: (city?: CityType) =>
        dispatch({ type: 'SET_CURRENT_CITY', payload: city }),
      setIsLoading: (loading: boolean) =>
        dispatch({ type: 'SET_LOADING', payload: loading }),
      getCity,
      setCityData: (cities: CityType[]) =>
        dispatch({ type: 'SET_CITIES', payload: cities }),
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
