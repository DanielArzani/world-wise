import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

type NotesInputProps = {
  cityName: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

/**
 * This component provides an input field for users to add notes about their trips to specific cities.
 *
 * @param cityName The name of the city.
 * @param value Current value of the textarea.
 * @param onChange Handler to manage textarea value changes.
 */
const NotesInput = ({ cityName, value, onChange }: NotesInputProps) => (
  <Row>
    <label htmlFor='notes'>Notes about your trip to {cityName}</label>
    <TextArea id='notes' onChange={onChange} value={value} />
  </Row>
);

const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3125rem;
  position: relative;
`;
const TextArea = styled.textarea`
  background-color: var(--color-light--3);
  border: none;
  border-radius: 5px;
  font-family: inherit;
  font-size: 1rem;
  padding: 1.5rem 0.75rem;
  transition: all 0.2s;
  width: 100%;

  &:active {
    background-color: #fff;
  }
`;

export default NotesInput;
