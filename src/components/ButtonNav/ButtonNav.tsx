import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import styled from 'styled-components';

function ButtonNav() {
  return (
    <Li>
      <Link to=''>
        <ButtonNavChoice>Cities</ButtonNavChoice>
      </Link>
    </Li>
  );
}

export default ButtonNav;

const Li = styled.li`
  background-color: var(--color-dark--2);
  padding: 0.5rem 0.75rem;
  border-radius: 5px;
`;

const ButtonNavChoice = styled(Button)`
  font-size: 0.75rem;
`;
