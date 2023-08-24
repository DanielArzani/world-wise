import React from 'react';
import styled from 'styled-components';
import Sidebar from '../../components/Sidebar';
import Map from '../../components/Map';

/**
 * The page where the actual application where users can interact with is. Once a user is authenticated, this component will also take care of fetching their data
 */
function ApplicationPage() {
  return (
    <Wrapper className='with-sidebar'>
      <Sidebar />

      <Map />
    </Wrapper>
  );
}

export default ApplicationPage;

const Wrapper = styled.div`
  background-color: var(--color-dark--1);
  min-height: 100%;
`;
