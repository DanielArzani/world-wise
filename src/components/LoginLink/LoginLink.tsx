import React from 'react';
import GenericLink, { LinkStyles } from '../GenericLink';
import styled from 'styled-components';

type LoginLinkProps = {
  children: React.ReactNode;
  endpoint?: string;
};

/**
 * The link used for going to the login page
 * @param children The text that should be displayed
 * @param endpoint The url that the link will route to, will default to /login but if user is verified, will go to /app
 */
function LoginLink({ children, endpoint = '/login' }: LoginLinkProps) {
  return (
    <LoginLinkStyles>
      <GenericLink endpoint={endpoint}>{children}</GenericLink>
    </LoginLinkStyles>
  );
}

export default LoginLink;

const LoginLinkStyles = styled(LinkStyles)``;
