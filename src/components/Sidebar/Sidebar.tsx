import React from 'react';
import styled from 'styled-components';

import logo from '../../assets/logo.png';
import { Link, Outlet } from 'react-router-dom';
import SidebarNavigation from '../SidebarNavigation';
// import VisitedCities from '../VisitedCities';
import { CityType } from '../../types/City';

// TODO: Change this
type SideBarProps = {
  cityData?: CityType;
};

/**
 * Controls the layout for the sidebars content
 * @param cityData The data of visited cities
 */
function Sidebar({ cityData }: SideBarProps) {
  return (
    <Wrapper>
      <ImageWrapper>
        <Link to='/'>
          <img src={logo} alt='Go back to homepage' width='200px' />
        </Link>
      </ImageWrapper>

      <SidebarNavigation />

      {/* <VisitedCities cityData={cityData} /> */}
      <Outlet />

      <Footer>
        <p>© Copyright {new Date().getFullYear()} by WorldWise Inc.</p>
      </Footer>
    </Wrapper>
  );
}

export default Sidebar;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 10fr 1fr;
  grid-template-rows: repeat(3, max-content) 1fr;
  align-items: center;
  gap: 1rem;

  min-height: 100%;

  /* image wrapper */
  & > :nth-child(1) {
    grid-column: 2/3;
    grid-row: 1/2;
  }

  /* sidebar nav */
  & > :nth-child(2) {
    grid-column: 2/3;
    grid-row: 2/3;
  }

  /* visited cities */
  & > :nth-child(3) {
    /* grid-column: 2/-1; */
    grid-column: 2/3;

    grid-row: 3/4;
  }

  /* footer */
  & > :nth-child(4) {
    grid-column: 2/3;
    grid-row: 4/5;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 2rem;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: center;

  color: var(--color-light--1);
  font-size: 0.75rem;
  margin-top: auto;
  margin-bottom: 2rem;
`;
