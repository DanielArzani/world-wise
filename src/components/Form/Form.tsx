import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../Button';
import BackButton from '../BackButton';
import { useCity } from '../../contexts/CityContext';
import { useUrlPosition } from '../../hooks/useUrlPosition';
import { LocationInfoType } from '../../types/LocationType';
import Loader from '../Loader';

// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0
const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

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
  const [country, setCountry] = useState<string>('');
  const [cityName, setCityName] = useState<string>('');
  const [date, setDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [notes, setNotes] = useState<string>('');
  const { currentCity } = useCity();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState<boolean>(false);
  const [geocodingError, setGeocodingError] = useState<string | null>(null);
  const clickedPosition = useUrlPosition();
  const lat = clickedPosition?.[0];
  const lng = clickedPosition?.[1];
  const [emoji, setEmoji] = useState<string>('');

  // fetch data about the location the user has clicked
  useEffect(() => {
    // if the user goes to /app/form and doesn't add the lat and lng query string then simply return else the geocoding service will default to the users location
    if (!lat && !lng) return;

    (async () => {
      try {
        setIsLoadingGeocoding(true);
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data: LocationInfoType = await res.json();

        // if the user clicks somewhere thats not considered part of a country, show them a nice error message
        if (!data.countryCode) {
          throw new Error(
            "👋 That doesn't seem to be a city. Click somewhere else 😉"
          );
        }

        setCityName(data.city || data.locality || '');
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
        setGeocodingError(null);
      } catch (error) {
        if (error instanceof Error) {
          setGeocodingError(error.message);
        } else {
          setGeocodingError('An unexpected error occurred.');
        }
      } finally {
        setIsLoadingGeocoding(false);
      }
    })();
  }, [lat, lng]);

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
  // so that this function isn't called on every render
  if (currentCity !== undefined) handleBackClick();

  // if its loading, show a spinner
  if (isLoadingGeocoding)
    return (
      <LoadingSpinnerWrapper>
        <Loader />
      </LoadingSpinnerWrapper>
    );

  // if there's an error display it instead of the form
  if (geocodingError != null)
    return <ErrorMessage>{geocodingError}</ErrorMessage>;

  // if there's somehow not lat and lng query string
  if (!lat && !lng)
    return <ErrorMessage>Start by clicking somewhere on the map</ErrorMessage>;

  return (
    <>
      {geocodingError == null && (
        <FormWrapper onSubmit={handleSubmit}>
          {/* City name input */}
          <Row>
            <label htmlFor='cityName'>City name</label>
            <Input
              id='cityName'
              onChange={(e) => handleInputChange(setCityName, e)}
              value={cityName}
            />
            {/* Placeholder for future flag emoji display */}
            <Flag>{emoji}</Flag>
          </Row>

          {/* Date input */}
          <Row>
            <label htmlFor='date'>When did you go to {cityName}?</label>
            <Input
              id='date'
              type='date'
              onChange={(e) => handleInputChange(setDate, e)}
              value={date}
            />
          </Row>

          {/* Notes textarea */}
          <Row>
            <label htmlFor='notes'>Notes about your trip to {cityName}</label>
            <TextArea
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
      )}
    </>
  );
}

export default Form;

const LoadingSpinnerWrapper = styled.div`
  transform: translate(-7%, 10rem);
  grid-column: 2/-1;
  grid-row: 3/4;
`;

const ErrorMessage = styled.p`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 1.25rem auto;
  text-align: center;
  width: 80%;
`;

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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Flag = styled.span`
  position: absolute;
  right: 0.625rem;
  top: 1.6875rem;
  font-size: 1.75rem;
`;
