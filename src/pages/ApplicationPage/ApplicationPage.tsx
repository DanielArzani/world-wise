import React from 'react';
import styled from 'styled-components';
import Sidebar from '../../components/Sidebar';

/**
 * The page where the actual application where users can interact with is
 */
function ApplicationPage() {
  return (
    <Wrapper className='with-sidebar'>
      <div>
        <Sidebar />
      </div>

      <div style={{ backgroundColor: 'gray' }}>LEAFLET MAP</div>
    </Wrapper>
  );
}

export default ApplicationPage;

const Wrapper = styled.div`
  background-color: var(--color-dark--1);
  min-height: 100%;
`;
