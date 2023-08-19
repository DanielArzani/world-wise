import React from 'react';
import styled from 'styled-components';
import ButtonLogin from '../../components/ButtonLogin';
import { Link } from 'react-router-dom';
import media from '../../utils/mediaQueries';
import Header from '../../components/Header';

/**
 * The page which displays the form to login to use the application
 */
function LoginPage() {
  return (
    <Wrapper>
      <Header />
      <FormWrapper>
        <Form>
          <FormControls>
            <Label htmlFor='email'>Email Address</Label>
            <Input type='text' id='email' autoComplete='email' />
          </FormControls>

          <FormControls>
            <Label htmlFor='password'>Password</Label>
            <Input type='password' id='password' />
          </FormControls>

          <div>
            <ButtonLogin>
              <Link to='/app'>Login</Link>
            </ButtonLogin>
          </div>
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
