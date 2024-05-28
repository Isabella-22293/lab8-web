import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from '../src/components/button';

test('renders button correctly', () => {
  const { getByText } = render(<Button label="1" onClick={() => {}} />);
  expect(getByText('1')).toBeInTheDocument();
});

test('calls onClick when clicked', () => {
  const handleClick = jest.fn();
  const { getByText } = render(<Button label="1" onClick={handleClick} />);
  fireEvent.click(getByText('1'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});