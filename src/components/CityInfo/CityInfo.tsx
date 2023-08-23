import React from 'react';
import styled from 'styled-components';
import formatDate from '../../utils/formateDate';
import { useNavigate } from 'react-router-dom';
import { useCityFromUrl } from '../../hooks/useCityFromUrl';
import Button from '../Button';
import { useCity } from '../../contexts/CityContext';

/**
 * Displays information about a specific city as well as a link for further research and personal notes
 */
function CityInfo() {
  const navigate = useNavigate();
  const cityContext = useCity();
  const matchedCity = useCityFromUrl(cityContext.cityData);

  if (matchedCity === undefined)
    return (
      <>
        <h2>No Matching City</h2>
      </>
    );

  const { cityName, country, emoji, date, notes } = matchedCity;

  return (
    <Wrapper>
      <CityNameWrapper>
        <h2>City Name</h2>
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
        <a
          href={`https://www.wikipedia.org/wiki/${matchedCity.cityName}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          Check out {cityName} on Wikipedia →
        </a>
      </WikiLinkWrapper>

      <Button type='back' onClick={() => navigate(-1)}>
        ← BACK
      </Button>
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

  & button {
    align-self: start;
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
