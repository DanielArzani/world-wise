import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

type GenericLinkProps = {
  children: React.ReactNode;
  endpoint: string;
};

/**
 * A general, re-usable and customizable link component that uses the Link component from react-router-dom. Should be used in other Link components rather than on its own and styled components should be used to overwrite its base styles.
 * @param endpoint The endpoint that the Link component should route to. Note that it should start a /
 * @param Children The text that should be displayed
 * @example
 *
 */
function GenericLink({ children, endpoint }: GenericLinkProps) {
  return (
    <LinkStyles>
      <Link to={endpoint}>{children}</Link>
    </LinkStyles>
  );
}

export default GenericLink;

export const LinkStyles = styled.div`
  background-color: var(--color-brand--2);
  border: none;
  border-radius: 7px;
  color: var(--color-dark--0);
  cursor: pointer;
  font-weight: 700;
  padding: 0;
  text-transform: uppercase;

  & > a {
    display: inline-block;

    color: inherit;
    font-weight: inherit;
    font-size: inherit;
    padding: 0.75rem 1.5rem;
  }
`;
