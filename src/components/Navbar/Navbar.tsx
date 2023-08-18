import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import media from '../../utils/mediaQueries';
import ButtonLogin from '../ButtonLogin';

/**
 * The navigation bar, also holds a log in button
 */
function Navbar() {
  return (
    <Nav>
      <Ul className='cluster'>
        <Li>
          <NavLink to='/pricing'>Pricing</NavLink>
        </Li>

        <Li>
          <NavLink to='/product'>Product</NavLink>
        </Li>
      </Ul>

      <ButtonLogin>Login</ButtonLogin>
    </Nav>
  );
}

export default Navbar;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin: 0 auto;

  @media ${media.sm} {
    margin: 0 0;
  }

  /* TODO: Move this into its component */
  & button {
    margin: 0 auto;

    @media ${media.sm} {
      margin: 0 0;
    }
  }
`;

const Ul = styled.ul`
  --space: 2rem;
  justify-content: center;
`;

const Li = styled.li``;
