import React from 'react';
import styled from 'styled-components';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type: 'primary' | 'back' | 'position';
  buttonType?: 'button' | 'submit' | 'reset' | undefined;
};

/**
 * A re-usable, customizable button
 * @param children The content of the button
 * @param onClick The function to be called on click event
 * @param type A condition for adding a css class
 * @param buttonType The type of html button it is, e.g. a submit button
 */
function Button({
  children,
  onClick,
  type,
  buttonType = 'button',
}: ButtonProps) {
  return (
    <ButtonStyles className={type} onClick={onClick} type={buttonType}>
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
