import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import media from '../../utils/mediaQueries';
import Header from '../../components/Header';
import { useAuth } from '../../contexts/FakeAuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

/**
 * The page which displays the form to login to use the application
 */
function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [emailValue, setEmailValue] = useState('jack@example.com');
  const [passwordValue, setPasswordValue] = useState('qwerty');

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (emailValue && passwordValue) {
      login(emailValue, passwordValue);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      // if you press the back button then since the user is still logged in it will immediately move them back to the application page. Replace will replace the login page in the history with the /app route
      navigate('/app', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <Wrapper>
      <Header />
      <FormWrapper>
        <Form onSubmit={handleSubmit}>
          <FormControls>
            <Label htmlFor='email'>Email Address</Label>
            <Input
              type='text'
              id='email'
              autoComplete='email'
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
            />
          </FormControls>

          <FormControls>
            <Label htmlFor='password'>Password</Label>
            <Input
              type='password'
              id='password'
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
            />
          </FormControls>

          <LinkWrapper>
            <Button buttonType='submit' type='primary'>
              Login
            </Button>
          </LinkWrapper>
        </Form>
      </FormWrapper>
    </Wrapper>
  );
}

export default LoginPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  background-color: var(--color-dark--1);
  min-height: 100%;
  padding-inline: 1rem;

  @media ${media.sm} {
    gap: 8rem;
  }
`;

const FormWrapper = styled.div`
  display: grid;
  place-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  background-color: var(--color-dark--2);
  border-radius: 7px;
  padding: 1.5rem 2rem;
  width: 100%;

  @media ${media.sm} {
    width: 460px;
  }
`;

const FormControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: var(--color-light--2);
  font-size: 1rem;
  font-weight: 600;
`;

const Input = styled.input`
  background-color: var(--color-light--3);
  border: none;
  border-radius: 5px;
  padding: 0.5rem;
  padding-left: 1rem;
  font-family: inherit;
  font-size: 1rem;
  transition: all 0.2s;
  width: 100%;

  &:focus {
    outline: none;
    background-color: #fff;
  }
`;

const LinkWrapper = styled.div`
  align-self: start;

  & > button {
    border: none;
    border-radius: 10px;
  }
`;
