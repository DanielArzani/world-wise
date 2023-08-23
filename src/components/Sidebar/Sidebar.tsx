import React from 'react';
import styled from 'styled-components';

import logo from '../../assets/logo.png';
import { Link, Outlet } from 'react-router-dom';
import SidebarNavigation from '../SidebarNavigation';

/**
 * Controls the layout for the sidebars content
 */
function Sidebar() {
  return (
    <Wrapper>
      <ImageWrapper>
        <Link to='/'>
          <img src={logo} alt='Go back to homepage' width='200px' />
        </Link>
      </ImageWrapper>

      <LocationWrapper>
        <SidebarNavigation />

        <Outlet />
      </LocationWrapper>

      <Footer>
        <p>© Copyright {new Date().getFullYear()} by WorldWise Inc.</p>
      </Footer>
    </Wrapper>
  );
}

export default Sidebar;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 10% 90% 10%;
  grid-template-rows: max-content max-content 1fr;
  justify-content: center;

  min-height: 100%;

  /* image wrapper */
  & > :nth-child(1) {
    grid-column: 2/3;
    grid-row: 1/2;

    margin-bottom: 2rem;
  }

  /* sidebar nav and visited cities/countries */
  & > :nth-child(2) {
    grid-column: 2/3;
    grid-row: 2/3;

    /* visited cities/countries */
    & > :nth-child(2) {
      align-self: center;
    }
  }

  /* footer */
  & > :nth-child(3) {
    grid-column: 2/3;
    grid-row: 3/4;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 2rem;
`;

const LocationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: center;

  color: var(--color-light--1);
  font-size: 0.75rem;
  margin-top: auto;
  margin-bottom: 2rem;
`;
