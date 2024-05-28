import React from 'react';
import { render } from '@testing-library/react';
import Display from '../src/components/display';

test('renders display correctly', () => {
  const { getByText } = render(<Display value="123" />);
  expect(getByText('123')).toBeInTheDocument();
});

test('displays error for negative result', () => {
  const { getByText } = render(<Display value="ERROR" />);
  expect(getByText('ERROR')).toBeInTheDocument();
});

