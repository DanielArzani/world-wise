import React from 'react';
import styled from 'styled-components';

type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
};

/**
 * A re-usable, generic, customizable button. Should be used within another Button component rather than on its own. Styles should be done using styled components. This component exports its ButtonStyles styled-component
 * @param onClick The function to pass into the button on a click event
 * @param children The content of the button
 * @example
 *  function ButtonLogin() {
 *   return (
 *     <StyledButtonLogin onClick={() => setSomeState()}>Login</StyledButtonLogin>
 *   );
 * }
 *
 * const StyledButtonLogin = styled(ButtonStyles)`
 *   background: red;
 * `;
 */
function Button({ onClick, children }: ButtonProps) {
  return <ButtonStyles onClick={onClick}>{children}</ButtonStyles>;
}

export default Button;

export const ButtonStyles = styled.button`
  border: none;
  border-radius: 7px;
  cursor: pointer;
  font-weight: bold;
  padding: 0.5rem 1.2rem;
  text-transform: uppercase;
`;
