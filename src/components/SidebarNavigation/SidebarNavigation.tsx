import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

/**
 * The navigation bar that allows a user to choice between the cities and countries route
 */
function SidebarNavigation() {
  return (
    <nav>
      <ChoicesUl>
        <Li>
          <NavLink to='/app/cities'>Cities</NavLink>
        </Li>

        <Li>
          <NavLink to='/app/countries'>Countries</NavLink>
        </Li>
      </ChoicesUl>
    </nav>
  );
}

export default SidebarNavigation;

const ChoicesUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Li = styled.li`
  background-color: var(--color-dark--2);
  border-radius: 5px;
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
`;
