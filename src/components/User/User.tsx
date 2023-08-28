import React from 'react';
import { useAuth } from '../../contexts/FakeAuthContext';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function User() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Wrapper>
      <ImageWrapper>
        <img
          height='100%'
          width='100%'
          src={user?.avatar}
          alt={`${user?.name}'s avatar`}
          style={{ display: 'block', objectFit: 'cover' }}
        />
      </ImageWrapper>
      <P>Welcome {user?.name}</P>
      <LogoutButton
        onClick={() => {
          logout();
          navigate('/');
        }}
      >
        Logout
      </LogoutButton>
    </Wrapper>
  );
}

export default User;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ImageWrapper = styled.div`
  border-radius: 100px;
  height: 2.5rem;
  width: 2.5rem;
  overflow: hidden; // This ensures the inner image is confined to the circular div shape
`;

const P = styled.p``;

const LogoutButton = styled.button`
  background-color: var(--color-dark--2);
  border-radius: 7px;
  border: none;
  color: inherit;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.375rem 0.75rem;
  text-transform: uppercase;
`;
