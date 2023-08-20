import React from 'react';
import styled from 'styled-components';

import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import Button from '../Button';
import ButtonNav from '../ButtonNav';

function Sidebar() {
  return (
    <Wrapper>
      <ImageWrapper className='center'>
        <img src={logo} alt='' width='200px' />
      </ImageWrapper>

      <nav className='center'>
        <ChoicesUl>
          <ButtonNav />
          <ButtonNav />
        </ChoicesUl>
      </nav>

      <VisitedUl>
        <li>
          <Link to=''>
            <Button>Lisbon</Button>
          </Link>
        </li>
        <li>
          <Link to=''>
            <Button>Madrid</Button>
          </Link>
        </li>
        <li>
          <Link to=''>
            <Button>Paris</Button>
          </Link>
        </li>
      </VisitedUl>

      <Footer>
        <p>© Copyright 2023 by WorldWise Inc.</p>
      </Footer>
    </Wrapper>
  );
}

export default Sidebar;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  min-height: 100%;
`;

const ImageWrapper = styled.div`
  margin-top: 2rem;
`;

const ChoicesUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const VisitedUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Footer = styled.footer`
  margin-top: auto;
`;
