import { useEffect } from 'react';
import { LocationInfoType } from '../types/LocationType';
import { convertToEmoji } from '../utils/convertToEmoji';

// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0
const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

/**
 * Custom hook to fetch geocoding information based on latitude and longitude.
 *
 * @param {number | undefined} lat - Latitude of the location.
 * @param {number | undefined} lng - Longitude of the location.
 * @param {React.Dispatch<React.SetStateAction<string>>} setCityName - Setter function for city name state.
 * @param {React.Dispatch<React.SetStateAction<string>>} setCountry - Setter function for country state.
 * @param {React.Dispatch<React.SetStateAction<string>>} setEmoji - Setter function for emoji state.
 * @param {React.Dispatch<React.SetStateAction<string | null>>} setGeocodingError - Setter function for geocoding error state.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsLoadingGeocoding - Setter function for loading state.
 */
export const useGeocoding = (
  lat: number | undefined,
  lng: number | undefined,
  setCityName: React.Dispatch<React.SetStateAction<string>>,
  setCountry: React.Dispatch<React.SetStateAction<string>>,
  setEmoji: React.Dispatch<React.SetStateAction<string>>,
  setGeocodingError: React.Dispatch<React.SetStateAction<string | null>>,
  setIsLoadingGeocoding: React.Dispatch<React.SetStateAction<boolean>>
) => {
  useEffect(() => {
    // If latitude and longitude are not provided, exit the effect.
    if (!lat && !lng) return;

    // Asynchronous function to fetch the geocoding information.
    (async () => {
      try {
        setIsLoadingGeocoding(true); // Set the loading state to true before the fetch call.
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data: LocationInfoType = await res.json();

        // Handle scenarios where the clicked location is not a city.
        if (!data.countryCode) {
          throw new Error(
            "👋 That doesn't seem to be a city. Click somewhere else 😉"
          );
        }

        // Set state values based on the fetched data.
        setCityName(data.city || data.locality || '');
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
        setGeocodingError(null);
      } catch (error) {
        // Handle errors during the fetch call.
        if (error instanceof Error) {
          setGeocodingError(error.message);
        } else {
          setGeocodingError('An unexpected error occurred.');
        }
      } finally {
        setIsLoadingGeocoding(false); // Reset the loading state after fetching is complete.
      }
    })();
  }, [
    lat,
    lng,
    setCityName,
    setCountry,
    setEmoji,
    setGeocodingError,
    setIsLoadingGeocoding,
  ]); // Dependencies for the effect.
};
