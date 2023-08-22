import React from 'react';
import styled from 'styled-components';
import Sidebar from '../../components/Sidebar';
// import { CityType } from '../../types/City';

/**
 * The page where the actual application where users can interact with is. Once a user is authenticated, this component will also take care of fetching their data
 */
function ApplicationPage() {
  // const [cityData, setCityData] = useState<CityType>([]);

  // useEffect(() => {
  //   (async () => {
  //     const res = await fetch('http://localhost:3000/cities');
  //     const data: CityType = await res.json();
  //     setCityData(data);
  //   })();
  // }, []);

  return (
    <Wrapper className='with-sidebar'>
      <Sidebar />

      <div style={{ backgroundColor: 'gray' }}>LEAFLET MAP</div>
    </Wrapper>
  );
}

export default ApplicationPage;

const Wrapper = styled.div`
  background-color: var(--color-dark--1);
  min-height: 100%;
`;
