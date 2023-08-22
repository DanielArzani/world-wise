import React from 'react';
import styled from 'styled-components';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type: 'primary' | 'back' | 'position';
};

/**
 * A re-usable, customizable button
 * @param children The content of the button
 * @param onClick The function to be called on click event
 * @param type A condition for adding a css class
 */
function Button({ children, onClick, type }: ButtonProps) {
  return (
    <ButtonStyles className={type} onClick={onClick}>
      {children}
    </ButtonStyles>
  );
}

export default Button;

const ButtonStyles = styled.button`
  color: inherit;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.9375rem;
  padding: 0.5rem 1rem;
  text-transform: uppercase;

  &.primary {
    background-color: var(--color-brand--2);
    color: var(--color-dark--1);
    font-weight: 700;
  }

  &.back {
    background: none;
    border: 1px solid currentColor;
    font-weight: 600;
  }

  &.position {
    position: absolute;
    bottom: 2.5rem;
    left: 50%;

    background-color: var(--color-brand--2);
    box-shadow: 0 0.25rem 0.75rem rgba(36, 42, 46, 0.16);
    color: var(--color-dark--1);
    font-weight: 700;
    font-size: 0.5469rem;
    transform: translateX(-50%);
    z-index: 1000;
  }
`;

// .btn {
//   color: inherit;
//   text-transform: uppercase;
//   padding: 0.8rem 1.6rem;
//   font-family: inherit;
//   font-size: 1.5rem;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
// }

// .primary {
// font-weight: 700;
// background-color: var(--color-brand--2);
// color: var(--color-dark--1);
// }

// .back {
// font-weight: 600;
// background: none;
// border: 1px solid currentColor;
// }

// .position {
//   font-weight: 700;
//   position: absolute;
//   z-index: 1000;
//   font-size: 1.4rem;
//   bottom: 4rem;
//   left: 50%;
//   transform: translateX(-50%);
//   background-color: var(--color-brand--2);
//   color: var(--color-dark--1);
//   box-shadow: 0 0.4rem 1.2rem rgba(36, 42, 46, 0.16);
// }
