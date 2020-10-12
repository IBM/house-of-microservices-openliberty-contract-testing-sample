import React from 'react';
import { render } from '@testing-library/react';
import App from './Components/App';

test('renders a suitable title', () => {
  const { getByText } = render(<App />);
  const titleElement = getByText(/House Web Service/i);
  expect(titleElement).toBeInTheDocument();
});
