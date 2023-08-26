import React from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';

type DateInputProps = {
  date: string;
  onChange: (selectedDate: Date) => void;
};

/**
 * This component provides a date picker for users to select or view the date of their trip.
 *
 * @param date Selected or displayed date.
 * @param onChange Handler to manage date changes.
 */
const DateInput = ({ date, onChange }: DateInputProps) => {
  return (
    <Row>
      <label htmlFor='date'>When did you go?</label>
      <DatePicker
        selected={new Date(date)}
        onChange={onChange}
        dateFormat='yyyy-MM-dd'
        customInput={<CustomDatePickerInput />}
      />
    </Row>
  );
};

const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3125rem;
  position: relative;
`;
// I have to go through this round-about way to style the date picker because its from the react-date-picker library
const StyledDatePicker = styled.input`
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomDatePickerInput = React.forwardRef<HTMLInputElement, any>(
  ({ value, onClick }, ref) => (
    <StyledDatePicker type='text' value={value} onClick={onClick} ref={ref} />
  )
);
CustomDatePickerInput.displayName = 'CustomDatePickerInput';

export default DateInput;
