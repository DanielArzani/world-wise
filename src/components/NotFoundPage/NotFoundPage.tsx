import React from 'react';
import styled from 'styled-components';

function NotFoundPage() {
  return <Wrapper>PAGE NOT FOUND</Wrapper>;
}

export default NotFoundPage;

const Wrapper = styled.div`
  background-color: var(--color-dark--1);
  min-height: 100%;
`;
