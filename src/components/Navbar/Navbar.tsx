import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

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

      <button>Login</button>
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

  /* TODO: Move this into component */
  & button {
    margin: 0 auto;
  }
`;

const Ul = styled.ul`
  --space: 2rem;
  justify-content: center;
`;

const Li = styled.li``;
