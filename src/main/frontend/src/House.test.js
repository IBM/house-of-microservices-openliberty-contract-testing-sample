import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import expectedResult from './expectedResult.json';

import House from './Components/House';

test('includes an image', async () => {
  const { findByRole } = render(<House />);
  const image = await findByRole('img');
  expect(image).toBeTruthy();
});

// This is a weak test, but it might catch some issues
test('defines a source for the image', async () => {
  const { findByRole, debug } = render(<House />);
  const image = await findByRole('img');
  expect(image).toHaveAttribute('src', /.png/);
});
