import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import CloseButton from '../CloseButton';
import formatDate from '../../utils/formateDate';
import Loader from '../Loader';
import { useCity } from '../../contexts/CityContext';

/**
 * A list of visited cities that will change the url endpoint on click
 */
function VisitedCities() {
  const cityContext = useCity();

  const { isLoading, cityData } = cityContext;

  return (
    <>
      {isLoading && (
        <LoadingSpinnerWrapper>
          <Loader />
        </LoadingSpinnerWrapper>
      )}

      {!isLoading && cityData.length === 0 && (
        <Message>Add your first city by clicking on a city on the map!</Message>
      )}

      {!isLoading && cityData.length > 0 && (
        <Ul>
          {cityData.map((data) => (
            <CityListItem
              key={data.id}
              dateVisited={data.date}
              flag={data.emoji}
              endpoint={`${data.id}?lat=${data.position.lat}&lng=${data.position.lng}`}
              cityName={data.cityName}
              id={data.id}
            />
          ))}
        </Ul>
      )}
    </>
  );
}

export default VisitedCities;

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
  flex-direction: column;
  gap: 1rem;
  justify-content: center;

  max-width: 75%;
`;

type CityListItemProps = {
  cityName: string;
  dateVisited: string;
  endpoint: string;
  flag: string;
  id: number;
};

/**
 * A visited cities list item, holds and controls the layout for each item
 * @param flag The flag of the country in which the city is located. Should be an emoji
 * @param cityName The name of the city
 * @param dateVisited The date that the city was visited
 * @param endpoint The route that the user should go on click
 * @param id The id of the city list item
 * @example
 * <CityListItem
 *   dateVisited='January 1, 2022'
 *   flag='🇨🇦'
 *   endpoint='/'
 *   cityName='Toronto'
 * />
 */
function CityListItem({
  cityName,
  dateVisited,
  endpoint,
  flag,
  id,
}: CityListItemProps) {
  const { currentCity } = useCity();

  let cityId;
  if (currentCity !== undefined) {
    cityId = currentCity.id;
  }

  // FIXME: Fix the styles on cityItem--active
  return (
    <Li>
      <NavLink
        to={endpoint}
        className={`${id === cityId ? 'cityItem--active' : ''}`}
      >
        <ChildWrapper>
          <P>
            <span>{flag}</span>

            {cityName}
          </P>
        </ChildWrapper>

        <ChildWrapper>
          <Time dateTime={dateVisited}>{formatDate(dateVisited)}</Time>
          <CloseButton />
        </ChildWrapper>
      </NavLink>
    </Li>
  );
}

const Li = styled.li`
  background-color: var(--color-dark--2);
  border-radius: 10px;

  & > a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5rem;

    box-shadow: inset 5px 0 0 0 var(--color-brand--2);
    padding: 0.25rem 1rem;
  }
`;

const ChildWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const P = styled.p`
  display: flex;
  gap: 1rem;
  align-items: center;

  & > span {
    font-size: 2rem;
  }
`;

const Time = styled.time`
  font-size: 1rem;
  font-weight: 400;
`;
