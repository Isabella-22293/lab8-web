import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Calculadora from '../src/components/calculadora';

test('renders calculadora correctly', () => {
  const { getByText } = render(<Calculadora />);
  expect(getByText('C')).toBeInTheDocument();
});

test('performs addition correctly', () => {
  const { getByText, getByRole } = render(<Calculadora />);
  fireEvent.click(getByText('1'));
  fireEvent.click(getByText('+'));
  fireEvent.click(getByText('2'));
  fireEvent.click(getByText('='));
  expect(getByRole('button', { name: /3/i })).toBeInTheDocument();
});

test('handles decimal input correctly', () => {
  const { getByText, getByRole } = render(<Calculadora />);
  fireEvent.click(getByText('1'));
  fireEvent.click(getByText('.'));
  fireEvent.click(getByText('5'));
  fireEvent.click(getByText('+'));
  fireEvent.click(getByText('2'));
  fireEvent.click(getByText('='));
  expect(getByRole('button', { name: /3.5/i })).toBeInTheDocument();
});
