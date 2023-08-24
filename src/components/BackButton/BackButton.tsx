import React from 'react';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';

type BackButtonProps = {
  endpoint?: string | number;
};

/**
 * A button that will go back to a previous url on click.
 * @param endpoint The specific endpoint, if nothing is given then -1 will be used in order to return to the most previous url
 */
function BackButton({ endpoint = -1 }: BackButtonProps) {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => {
        if (typeof endpoint === 'number') {
          navigate(endpoint);
        } else {
          navigate(endpoint);
        }
      }}
      type='back'
    >
      &larr; Back
    </Button>
  );
}

export default BackButton;
