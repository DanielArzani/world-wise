import React from 'react';
import styled from 'styled-components';

function FullPageLoader() {
  return (
    <Wrapper>
      <Spinner></Spinner>
    </Wrapper>
  );
}

export default FullPageLoader;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 1000;
`;

const Spinner = styled.div`
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 8px solid lightblue;
  border-right-color: orange;
  animation: s2 1s infinite linear;

  @keyframes s2 {
    to {
      transform: rotate(1turn);
    }
  }
`;
