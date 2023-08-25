import { useState } from 'react';

type GeolocationPosition = {
  lat: number;
  lng: number;
};

/**
 * Gets users location using the browsers geolocation api
 * @param defaultPosition Co-ordinates that will become the position until geolocation gets the users current co-ordinates
 */
export function useGeolocation(
  defaultPosition: GeolocationPosition | null = null
) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [position, setPosition] = useState<GeolocationPosition | null>(
    defaultPosition
  );
  const [error, setError] = useState<string | null>(null);

  function getPosition() {
    if (!navigator.geolocation)
      return setError('Your browser does not support geolocation');

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return { isLoading, position, error, getPosition };
}

export default useGeolocation;
