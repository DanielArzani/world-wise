import React from 'react';
import styled from 'styled-components';

function Loader() {
  return (
    <Wrapper>
      <Spinner></Spinner>
    </Wrapper>
  );
}

export default Loader;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
