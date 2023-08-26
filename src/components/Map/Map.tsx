import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCity } from '../../contexts/CityContext';
import useGeolocation from '../../hooks/useGeolocation';
import Button from '../Button';

/**
 * The application map, which uses react-leaflet. It will display the location on the map depending on the searchParams of lat and lng
 */
function Map() {
  const { currentCity, cityData } = useCity();
  const [position, setPosition] = useState<[number, number]>([40, 0]);
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  // set the lat and lng which leaflet will use as its co-ordinates to the current cities lat and lng
  useEffect(() => {
    if (currentCity && currentCity.position) {
      const lat = currentCity.position.lat;
      const lng = currentCity.position.lng;

      const mapPosition: [number, number] = [lat, lng];
      setPosition(mapPosition);
    }
  }, [currentCity]);

  // synchronize the geolocation position with the maps position. In other words, when the user wants to move to their own position, set the maps position to what ever the geolocation api returns.
  useEffect(() => {
    if (geolocationPosition)
      setPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition]);

  return (
    <Wrapper>
      {!geolocationPosition && (
        <Button type='position' onClick={getPosition}>
          {isLoadingPosition ? 'Loading...' : 'Use your position'}
        </Button>
      )}

      <MapContainer
        style={{ minHeight: '100%' }}
        center={position}
        zoom={13}
        scrollWheelZoom={true}
      >
        <MapCenteringComponent center={position} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        />
        {/* displays one marker per city */}
        {cityData.map((city) => {
          return (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={city.id}
            >
              <Popup>{city.notes || 'There are no notes'}</Popup>
            </Marker>
          );
        })}
        {/* Display a marker at the users current location */}
        {geolocationPosition && (
          <Marker position={[geolocationPosition.lat, geolocationPosition.lng]}>
            <Popup>You are here</Popup>
          </Marker>
        )}
        <DetectClick />
      </MapContainer>
    </Wrapper>
  );
}

export default React.memo(Map);

const Wrapper = styled.div`
  background-color: gray;
`;

/**
 * Causes the MapContainer component from the leaflet library to re-render.
 * According to their docs:
 * { Except for its children, MapContainer props are immutable: changing them after they have been set a first time will have no effect on the Map instance or its container. }
 * @param center The position will be centered
 */
function MapCenteringComponent({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

/**
 * Changes the url when the MapContainer is clicked
 */
function DetectClick() {
  const navigate = useNavigate(); // A method from react-router-dom for changing the url endpoint

  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  return null;
}
