import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import expectedResult from './expectedResult.json';

import BodyPart from './Components/BodyPart';

test('includes an image', async () => {
  const { findByRole } = render(<BodyPart name="torso" />);
  const image = await findByRole('img');
  expect(image).toBeTruthy();
});

test('uses the name for the image', async () => {
  const { findByRole, debug } = render(<BodyPart name="legs" />);
  const image = await findByRole('img');
  expect(image).toHaveAttribute('src', 'images/legs.png');
});
