import { useLocation } from 'react-router-dom';
import { CityType } from '../types/City';

/**
 * Custom hook to extract search parameters from the URL.
 */
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

/**
 * Finds a city in the given cities array based on the provided latitude and longitude.
 *
 * @param cities The array of CityType to search in.
 * @param lat The latitude to match.
 * @param lng The longitude to match.
 * @returns A city that matches the given latitude and longitude or undefined if no match is found.
 */
const findCityByLatAndLng = (
  cities: CityType[],
  lat: number,
  lng: number
): CityType | undefined => {
  return cities.find(
    (city) => city.position.lat === lat && city.position.lng === lng
  );
};

/**
 * Custom hook to extract latitude and longitude from URL search params and then find the corresponding city.
 *
 * @param cities The array of CityType to search in.
 * @returns The matched city or undefined if no match or invalid params.
 * @example
 * function MyComponent() {
 *const cities: CityType[] = [
 *  // ... your array of cities
 *  ];
 *
 * const matchedCity = useCityFromUrl(cities);
 *
 *  if (matchedCity) {
 *    return <div>Found city: {matchedCity.cityName}</div>;
 *  } else {
 *    return <div>City not found or invalid latitude/longitude values.</div>;
 *  }
 *}
 */
function useCityFromUrl(cities: CityType[]): CityType | undefined {
  const query = useQuery();
  const latString = query.get('lat');
  const lngString = query.get('lng');

  const lat = latString ? parseFloat(latString) : null;
  const lng = lngString ? parseFloat(lngString) : null;

  if (lat !== null && lng !== null) {
    return findCityByLatAndLng(cities, lat, lng);
  }

  return undefined;
}

export { useCityFromUrl, useQuery };
