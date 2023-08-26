import React, { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import Button from '../Button';
import BackButton from '../BackButton';
import { useCity } from '../../contexts/CityContext';
import { useUrlPosition } from '../../hooks/useUrlPosition';
import Loader from '../Loader';

import generateRandomNumber from '../../utils/generateRandomNumber';
import { CityType } from '../../types/City';
import NotesInput from '../NotesInput';
import CityInput from '../CityInput';
import DateInput from '../DateInput';
import { useGeocoding } from '../../hooks/useGeocoding';
import { useNavigate } from 'react-router-dom';

/**
 * Form component for adding details about a selected city.
 *
 * The form allows users to:
 * - Add/edit the city's name and see a corresponding country emoji.
 * - Select/edit the date of their trip.
 * - Add/edit notes about their trip to the city.
 * - Submit the form to add or update the city details.
 * - Remove a city from the list of visited cities
 *
 * The form also interacts with:
 * - The `CityContext` to get/update the current city and list of cities.
 * - The `useUrlPosition` hook to get the clicked coordinates from the URL.
 * - The `useGeocoding` hook to perform geocoding and reverse geocoding.
 */
function Form(): JSX.Element {
  const [country, setCountry] = useState<string>('');
  const [cityName, setCityName] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());

  const { isLoading, createCity } = useCity();
  const [notes, setNotes] = useState<string>('');
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState<boolean>(false);
  const [geocodingError, setGeocodingError] = useState<string | null>(null);
  const clickedPosition = useUrlPosition();
  const lat = clickedPosition?.[0];
  const lng = clickedPosition?.[1];
  const [emoji, setEmoji] = useState<string>('');
  const navigate = useNavigate();

  useGeocoding(
    lat,
    lng,
    setCityName,
    setCountry,
    setEmoji,
    setGeocodingError,
    setIsLoadingGeocoding
  );

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
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (lat === undefined || lng === undefined) {
      console.error('Latitude or Longitude is undefined.');
      return;
    }

    if (!cityName || !date) return;

    const newCityObject: CityType = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng,
      },
      id: generateRandomNumber(),
    };

    await createCity(newCityObject);
    navigate('/app/cities'); // move to the cities url have the new city has been created instead of staying at the form url
  };

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
        <FormWrapper
          onSubmit={handleSubmit}
          style={isLoading ? { opacity: 0.3 } : {}}
        >
          <CityInput
            value={cityName}
            emoji={emoji}
            onChange={(e) => handleInputChange(setCityName, e)}
          />
          <DateInput
            date={date}
            setDate={setDate}
            onChange={(selectedDate) => {
              if (selectedDate) {
                setDate(selectedDate);
              }
            }}
          />
          <NotesInput
            cityName={cityName}
            value={notes}
            onChange={(e) => handleInputChange(setNotes, e)}
          />
          <ButtonWrapper>
            <Button type='primary' buttonType='submit'>
              Add
            </Button>
            <BackButton endpoint='/app/cities' />
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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
