import React from 'react';
import styled from 'styled-components';
import media from '../../utils/mediaQueries';

import logo from '../../assets/logo.png';
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';

/**
 * The header of the page, holds the logo and the navbar
 */
function Header() {
  return (
    <HeaderStyles>
      <Wrapper>
        <Link to={'/'}>
          <Logo src={logo} alt='' />
          <h1 className='sr-only'>WORLD WISE</h1>
        </Link>
      </Wrapper>
      <Navbar />
    </HeaderStyles>
  );
}
export default Header;

const HeaderStyles = styled.header`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  padding: 2rem 3rem;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  margin-bottom: 1rem;
  transform: translateY(15%);

  @media ${media.sm} {
    margin: 0 0;
  }
`;

const Logo = styled.img`
  width: 200px;
`;
