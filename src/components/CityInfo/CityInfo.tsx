import React, { useEffect } from 'react';
import styled from 'styled-components';
import formatDate from '../../utils/formateDate';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../Button';
import Loader from '../Loader';
import { useCity } from '../../contexts/CityContext';

/**
 * Displays information about a specific city as well as a link for further research and personal notes. Also handles fetching the specific city.
 */
function CityInfo() {
  const navigate = useNavigate();
  const cityId = useParams();
  const { getCity, currentCity, isLoading } = useCity();

  // FIXME: The component mounts and un-mounts very quickly and some times even after the loading spinner, the component with stale values appears for a few seconds before the data changes to match the most recent data. Strange bugs happen at various times too such as flickering between old and new data
  useEffect(() => {
    if (cityId.id != null) {
      getCity(Number(cityId.id));
    }
  }, [cityId.id, getCity]);

  if (!currentCity || isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  const { cityName, country, emoji, date, notes } = currentCity;

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
          href={`https://www.wikipedia.org/wiki/${cityName}`}
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
