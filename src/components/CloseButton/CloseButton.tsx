import React from 'react';
import styled from 'styled-components';

type CloseButtonProps = {
  onClick?: (event: React.MouseEvent) => void;
};

/**
 * A button with an x shape that used for deleting or closing something
 * @param onClick The handler function that will be called on click
 */
function CloseButton({ onClick }: CloseButtonProps) {
  return (
    <StyledCloseButton
      onClick={onClick}
      role='button'
      aria-label='Close'
      tabIndex={0}
    >
      &#215;
    </StyledCloseButton>
  );
}

export default CloseButton;

const StyledCloseButton = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  aspect-ratio: 1;
  background-color: var(--color-dark--1);
  border: none;
  border-radius: 50%;
  color: var(--color-light--2);
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: 400;
  height: 1.5rem;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-brand--1);
  }
`;
