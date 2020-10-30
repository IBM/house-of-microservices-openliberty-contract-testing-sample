import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import expectedResult from './expectedResult.json';

import ResidentTable from './Components/ResidentTable';

// Workaround for CORS complaints; see https://github.com/axios/axios/issues/2654
import axios from 'axios';
axios.defaults.adapter = require('axios/lib/adapters/http');
jest.mock('axios');

axios.get.mockResolvedValue({ data: expectedResult });

test('includes the body part', async () => {
  // Set a global default so the implementation goes to the right url
  // (if we ran several tests in parallel this could get messy)
  const { queryByText } = render(<ResidentTable />);
  const el = await waitForElement(() => queryByText(/torso/i));
  expect(el).toBeTruthy();
});

test('handles state for body parts with state', async () => {
  const { findByAltText } = render(<ResidentTable />);

  // This is leaking the internals of the body part a bit, but is a handy way to confirm state was handled correctly
  const image = await findByAltText('hair-frizzled');
  expect(image).toBeTruthy();
});
