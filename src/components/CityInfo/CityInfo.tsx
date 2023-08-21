import React from 'react';
import { CityType } from '../../types/City';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formateDate';

type CityInfoProps = {
  oneCityData: CityType;
};

/**
 * Displays information about a specific city as well as a link for further research and personal notes
 * @param oneCityData The data about the city that should be displayed
 */
function CityInfo({ oneCityData }: CityInfoProps) {
  const { cityName, country, emoji, date, notes } = oneCityData;

  return (
    <Wrapper>
      <CityNameWrapper>
        <h2>CityName</h2>
        <div>
          <span role='img' aria-label={`Flag of ${country}`}>
            {emoji}
          </span>
          <p>{cityName}</p>
        </div>
      </CityNameWrapper>

      <DateVisitedWrapper>
        <h3>You went to {cityName} on</h3>
        <p>{formatDate(date)}</p>
      </DateVisitedWrapper>

      <NotesWrapper>
        <h3>Your Notes</h3>
        <p>{notes == null || !notes ? 'There are no notes' : notes}</p>
      </NotesWrapper>

      <WikiLinkWrapper>
        <h3>Learn More</h3>
        <Link to={`https://www.wikipedia.org/wiki/${oneCityData.cityName}`}>
          Check out {cityName} on Wikipedia →
        </Link>
      </WikiLinkWrapper>

      <BackButton>← BACK</BackButton>
    </Wrapper>
  );
}

export default CityInfo;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  background-color: var(--color-dark--2);
  border-radius: 7px;
  /* max-height: 70%; */
  overflow: scroll;
  padding: 1.25rem 1.875rem;
  width: 100%;

  & h2,
  h3 {
    color: var(--color-light--1);
    font-size: 0.6875rem;
    font-weight: 800;
    text-transform: uppercase;
  }
`;

const CityNameWrapper = styled.div`
  & > div {
    display: flex;
    align-items: center;
    gap: 1rem;

    & > span {
      font-size: 2rem;
    }

    & > p {
      font-size: 1.1875rem;
      font-weight: 700;
    }
  }
`;

const DateVisitedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const NotesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const WikiLinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  & a {
    font-size: 1rem;
    color: var(--color-brand--1);
    text-decoration: underline;
  }
`;

const BackButton = styled.button`
  align-self: flex-start;

  background: none;
  border: 1px solid var(--color-light--2);
  border-radius: 5px;
  color: inherit;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.9375rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  text-transform: uppercase;
`;
