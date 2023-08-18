import React from 'react';
import styled from 'styled-components';
import media from '../../utils/mediaQueries';

import logo from '../../assets/logo.png';
import Navbar from '../Navbar';

function Header() {
  return (
    <HeaderStyles>
      <Wrapper>
        <Logo src={logo} alt='World Wise' />
        <h1 className='sr-only'>WORLD WISE</h1>
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
