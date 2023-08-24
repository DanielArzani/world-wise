import React, { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import Button from '../Button';
import BackButton from '../BackButton';
import { useCity } from '../../contexts/CityContext';

/**
 * Convert a country code to its corresponding flag emoji.
 * @param {string} countryCode - The country code (e.g., "US" for United States).
 * @returns {string} The flag emoji corresponding to the given country code.
 */
export function convertToEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

function Form(): JSX.Element {
  // State declarations for form fields
  const [cityName, setCityName] = useState<string>('');
  // const [country, setCountry] = useState<string>('');
  const [date, setDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [notes, setNotes] = useState<string>('');
  const { currentCity } = useCity();

  /**
   * Generic handler for input changes.
   * Updates the state based on which input is being changed.
   * @param {React.Dispatch<React.SetStateAction<string>>} setStateFunc - The state setter function.
   * @param {ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} event - The event object.
   */
  const handleInputChange = (
    setStateFunc: React.Dispatch<React.SetStateAction<string>>,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setStateFunc(event.target.value);
  };

  /**
   * Handle form submission.
   * @param {FormEvent<HTMLFormElement>} event - The form event object.
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add logic to handle form submission
  };

  let position;
  /**
   * Handles returning to the previous url. Currently there is a problem where the number of times you click on the map is the number of times you have to click on the back button, this is to remedy that
   */
  const handleBackClick = () => {
    if (currentCity !== undefined) {
      const [lat] = [currentCity.position['lat']];
      const [lng] = [currentCity.position['lng']];
      const id = currentCity.id;
      position = `/app/cities/${id}?lat=${lat}&lng=${lng}`;
    }
  };
  handleBackClick();

  return (
    <FormWrapper onSubmit={handleSubmit}>
      {/* City name input */}
      <Row>
        <label htmlFor='cityName'>City name</label>
        <input
          id='cityName'
          onChange={(e) => handleInputChange(setCityName, e)}
          value={cityName}
        />
        {/* Placeholder for future flag emoji display */}
        {/* <Flag className={styles.flag}>{emoji}</Flag> */}
      </Row>

      {/* Date input */}
      <Row>
        <label htmlFor='date'>When did you go to {cityName}?</label>
        <input
          id='date'
          type='date'
          onChange={(e) => handleInputChange(setDate, e)}
          value={date}
        />
      </Row>

      {/* Notes textarea */}
      <Row>
        <label htmlFor='notes'>Notes about your trip to {cityName}</label>
        <textarea
          id='notes'
          onChange={(e) => handleInputChange(setNotes, e)}
          value={notes}
        />
      </Row>

      {/* Form action buttons */}
      <ButtonWrapper>
        <Button type='primary'>Add</Button>
        <BackButton endpoint={position} />
      </ButtonWrapper>
    </FormWrapper>
  );
}

export default Form;

const FormWrapper = styled.form`
  background-color: var(--color-dark--2);
  border-radius: 7px;
  padding: 1.25rem 1.875rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  &.loading {
    opacity: 0.3;

    button {
      pointer-events: none;
      background-color: var(--color-light--1);
      border: 1px solid var(--color-light--1);
      color: var(--color-dark--0);
    }
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3125rem;
  position: relative;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

// const Flag = styled.span`
//   position: absolute;
//   right: 0.625rem;
//   top: 1.6875rem;
//   font-size: 1.75rem;
// `;
