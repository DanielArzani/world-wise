import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import CloseButton from '../CloseButton';
import { CityType } from '../../types/City';
import formatDate from '../../utils/formateDate';

type VisitedCitiesProps = {
  cityData: CityType;
};

/**
 * A list of visited cities that will change the url endpoint on click
 * @param cityData The data of visited cities
 */
function VisitedCities({ cityData }: VisitedCitiesProps) {
  return (
    <Ul>
      {cityData.map((data) => {
        return (
          <CityListItem
            key={data.id}
            dateVisited={data.date}
            flag={data.emoji}
            endpoint='/'
            cityName={data.cityName}
          />
        );
      })}
    </Ul>
  );
}

export default VisitedCities;

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;

  max-width: 75%;
  transform: translateX(7%);
`;

type CityListItemProps = {
  cityName: string;
  dateVisited: string;
  endpoint: string;
  flag: string;
};

/**
 * A visited cities list item, holds and controls the layout for each item
 * @param flag The flag of the country in which the city is located. Should be an emoji
 * @param cityName The name of the city
 * @param dateVisited The date that the city was visited
 * @param endpoint The route that the user should go on click
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
}: CityListItemProps) {
  return (
    <Li>
      <NavLink to={endpoint}>
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
