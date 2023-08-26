import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

type CityInputProps = {
  value: string;
  emoji: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

/**
 * This component provides an input field for users to enter or view the name of a city, accompanied by an emoji flag.
 *
 * @param value Current value of the input field.
 * @param emoji Emoji flag representing the country of the city.
 * @param onChange Handler to manage input field value changes.
 */
const CityInput = ({ value, emoji, onChange }: CityInputProps) => (
  <Row>
    <label htmlFor='cityName'>City name</label>
    <Input id='cityName' onChange={onChange} value={value} />
    <Flag>{emoji}</Flag>
  </Row>
);

const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3125rem;
  position: relative;
`;

const Input = styled.input`
  background-color: var(--color-light--3);
  border: none;
  border-radius: 5px;
  font-family: inherit;
  font-size: 1rem;
  padding: 0.5rem 0.75rem;
  transition: all 0.2s;
  width: 100%;

  &:active {
    background-color: #fff;
  }
`;

const Flag = styled.span`
  position: absolute;
  right: 0.625rem;
  top: 1.6875rem;
  font-size: 1.75rem;
`;

export default CityInput;
