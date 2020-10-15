import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import expectedResult from './expectedResult.json';

import House from './Components/House';

test('includes an image', async () => {
  const { findAllByRole } = render(<House />);
  const images = await findAllByRole('img');
  expect(images.length).toBeGreaterThan(0);
});

// This is a weak test, but it might catch some issues
test('defines a source for the image', async () => {
  const { findByAltText } = render(<House room="kitchen" />);
  const image = await findByAltText('kitchen');
  expect(image).toBeTruthy();
  expect(image).toHaveAttribute(
    'src',
    expect.stringContaining('house-kitchen.png')
  );
});
