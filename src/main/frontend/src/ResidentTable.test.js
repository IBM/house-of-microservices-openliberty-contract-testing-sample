import React from 'react';
import { render, waitForElement } from '@testing-library/react';
const { pactWith } = require('jest-pact');
import expectedResult from './expectedResult.json';

import ResidentTable from './Components/ResidentTable';

// Workaround for CORS complaints; see https://github.com/axios/axios/issues/2654
import axios from 'axios';
axios.defaults.adapter = require('axios/lib/adapters/http');

describe('unit tests', () => {
  test('creates a div with a suitable class', async () => {
    const { container } = render(<ResidentTable />);
    expect(container.firstChild).toHaveClass('resident');
  });
});

const port = 9080;

describe('contract tests', () => {
  pactWith(
    {
      port: port,
      consumer: 'App',
      provider: 'House',
    },
    (provider) => {
      beforeEach(() => {
        const interaction = {
          uponReceiving: 'a request for the resident',
          withRequest: {
            method: 'GET',
            path: '/resident',
            headers: { Accept: 'application/json' },
          },
          willRespondWith: {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
            },
            body: expectedResult,
          },
        };
        return provider.addInteraction(interaction);
      });

      test('includes the body part', async () => {
        const { queryByText } = render(<ResidentTable />);
        const el = await waitForElement(() => queryByText(/torso/i));
        expect(el).toBeTruthy();
      });

      test('includes an image for a body part', async () => {
        const { findAllByRole } = render(<ResidentTable />);
        const images = await findAllByRole('img');
        expect(images.length).toBeGreaterThan(0);
      });
    }
  );
});
