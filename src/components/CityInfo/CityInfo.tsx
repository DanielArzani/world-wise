import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Loader from '../Loader';
import { useCity } from '../../contexts/CityContext';
import BackButton from '../BackButton';
import formatDate from '../../utils/formateDate';

/**
 * Displays information about a specific city as well as a link for further research and personal notes. Also handles fetching the specific city.
 */
function CityInfo() {
  const { id } = useParams();
  const { currentCity, isLoading, getCity } = useCity();

  // FIXME: The City information appears briefly then flickers away then the loading state appears then the city information comes back with the new city information.
  // In order to fix this, I moved the code within the getCity function from the CityContext to here.
  // If currentCity and setCurrentCity are local then it will work but when I bring them in from context, this problem appears

  useEffect(() => {
    if (id != null) {
      getCity(Number(id));
    }
  }, [id, getCity]);

  if (!currentCity || isLoading) {
    return (
      <LoadingSpinnerWrapper>
        <Loader />
      </LoadingSpinnerWrapper>
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
        {<p>{formatDate(date ? date.toString() : '')}</p>}
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

      <BackButton endpoint={'/app/cities'} />
    </Wrapper>
  );
}

export default React.memo(CityInfo);

const LoadingSpinnerWrapper = styled.div`
  transform: translate(-7%, 10rem);
  grid-column: 2/-1;
  grid-row: 3/4;
`;

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
