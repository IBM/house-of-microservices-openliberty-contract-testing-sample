import React from 'react';
import { render, waitForElement } from '@testing-library/react';
const pact = require('@pact-foundation/pact-node');
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

describe('contract tests', () => {
  pactWith(
    {
      consumer: 'App',
      provider: 'House',
    },
    (provider) => {
      var servers = pact.listServers();

      beforeEach(() => {
        const wakeInteraction = {
          uponReceiving: 'a request for the resident to wake up',
          withRequest: {
            method: 'GET',
            path: '/resident/wakeup',
          },
          willRespondWith: {
            status: 200,
          },
        };
        provider.addInteraction(wakeInteraction);

        const interaction = {
          uponReceiving: 'a request for the residents current state',
          withRequest: {
            method: 'GET',
            path: '/resident/state',
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
        // Set a global default so the implementation goes to the right url
        // (if we ran several tests in parallel this could get messy)
        axios.defaults.baseURL = provider.mockService.baseUrl;
        const { queryByText } = render(<ResidentTable />);
        const el = await waitForElement(() => queryByText(/torso/i));
        expect(el).toBeTruthy();
      });

      test('includes an image for a body part', async () => {
        const { findAllByRole } = render(<ResidentTable />);
        const images = await findAllByRole('img');
        expect(images.length).toBeGreaterThan(0);
      });

      test('handles state for body parts with state', async () => {
        const { findByAltText } = render(<ResidentTable />);

        // This is leaking the internals of the body part a bit, but is a handy way to confirm state was handled correctly
        const image = await findByAltText('hair-frizzled');
        expect(image).toBeTruthy();
      });
    }
  );
});
