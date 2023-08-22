import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

/**
 * The application map, which uses leaflet
 */
function Map() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  return (
    <Wrapper
      onClick={() => {
        navigate('form');
      }}
    >
      <h2>LEAFLET MAP COMPONENT</h2>
      <p>latitude: {lat}</p>
      <p>longitude: {lng}</p>
    </Wrapper>
  );
}

export default Map;

const Wrapper = styled.div`
  background-color: gray;
`;