import React from 'react';
import styled from 'styled-components';
import { CityType } from '../../types/City';
import Loader from '../Loader';
import { CountryType } from '../../types/CountryType';

type VisitedCountriesProps = {
  cityData: CityType[];
  isLoading: boolean;
};

/**
 * Displays the countries that have been visited. Removes any duplicates (i.e. if a user has been to Toronto, CA and Quebec, CA then there will still only be one Canada displayed)
 * @param cityData The data of visited cities
 * @param isLoading Whether the data has loaded or not
 */
function VisitedCountries({ cityData, isLoading }: VisitedCountriesProps) {
  // Derive a list of countries from the cityData
  const uniqueCountriesSet = new Set(cityData.map((city) => city.country));
  console.log(uniqueCountriesSet);

  const countryData: CountryType[] = Array.from(uniqueCountriesSet).map(
    (country) => {
      const matchingCity = cityData.find((city) => city.country === country);
      return {
        countryName: country,
        countryFlag: matchingCity ? matchingCity.emoji : '',
      };
    }
  );

  return (
    <>
      {isLoading && (
        <LoadingSpinnerWrapper>
          <Loader />
        </LoadingSpinnerWrapper>
      )}

      {!isLoading && countryData.length === 0 && (
        <Message>
          There are no countries yet, add your first city instead!
        </Message>
      )}

      {!isLoading && countryData.length > 0 && (
        <Ul>
          {countryData.map((data) => (
            <CountryListItem
              key={data.countryName}
              countryName={data.countryName}
              countryFlag={data.countryFlag}
            />
          ))}
        </Ul>
      )}
    </>
  );
}

export default VisitedCountries;

const LoadingSpinnerWrapper = styled.div`
  transform: translate(-7%, 10rem);
  grid-column: 2/-1;
  grid-row: 3/4;
`;

const Message = styled.div`
  border: 1px solid var(--color-brand--2);
  background-color: rgba(0, 0, 0, 0.05);
  padding: 1rem 1.5rem;
  border-radius: 5px;
  text-align: center;
  font-weight: 500;
  color: var(--color-brand--2);
  margin-top: 1rem;
  margin-right: 1rem;
`;

const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

type CityListItemProps = {
  countryName: string;
  countryFlag: string;
};

/**
 * Displays a country's name and flag.
 */
function CountryListItem({ countryName, countryFlag }: CityListItemProps) {
  return (
    <Li>
      <span style={{ fontSize: '1.5rem' }}>{countryFlag}</span>

      <span>{countryName}</span>
    </Li>
  );
}

const Li = styled.li`
  flex-basis: 33%;

  display: flex;
  align-items: center;
  flex-basis: 33.33333%;
  flex-direction: column;
  flex-grow: 1;
  gap: 0.2rem;

  background-color: var(--color-dark--2);
  border-left: 5px solid var(--color-brand--1);
  border-radius: 7px;
  font-size: 1.0625rem;
  font-weight: 600;
  padding: 1rem 2rem;
  max-width: 45%;
`;
