import { useSearchParams } from 'react-router-dom';

/**
 * Gets the lat and lng search params from the url using the useSearchParams hook from the react-router-dom library
 */
export function useUrlPosition(): [number, number] | undefined {
  const [searchParams] = useSearchParams();

  const latString = searchParams.get('lat');
  const lngString = searchParams.get('lng');

  if (!latString || !lngString) {
    console.error('lat and lng are undefined');
    return undefined;
  }

  const lat = parseFloat(latString);
  const lng = parseFloat(lngString);

  // Check if lat and lng are valid numbers
  if (isNaN(lat) || isNaN(lng)) {
    console.error("lat and lng aren't valid numbers");
    return undefined;
  }

  // Check if lat and lng are within valid ranges
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
    console.error("lat and lng aren't within valid ranges");
    return undefined;
  }

  return [lat, lng];
}
