import React from 'react';
import styled from 'styled-components';

import { ButtonStyles } from '../Button/Button';

type ButtonLoginProps = {
  children: React.ReactNode;
};

/**
 * The login button, on click opens a modal allowing a user to login. It takes children instead of saying the word login because some login buttons may say other things.
 * @param children The content of the button
 */
function ButtonLogin({ children }: ButtonLoginProps) {
  return <StyledButtonLogin>{children}</StyledButtonLogin>;
}

export default ButtonLogin;

export const StyledButtonLogin = styled(ButtonStyles)`
  background-color: var(--color-brand--2);
  color: var(--color-dark--0);
  position: relative;

  & > a.active {
    /* this is so that the colour when on the login page isn't the same as the bg colour */
    color: var(--color-dark--0);
  }
`;
