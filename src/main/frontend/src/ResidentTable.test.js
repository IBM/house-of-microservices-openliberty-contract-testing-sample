import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import { Matchers } from '@pact-foundation/pact';
const { pactWith } = require('jest-pact');
import expectedResult from './expectedResult.json';

import ResidentTable from './Components/ResidentTable';

// Workaround for CORS complaints; see https://github.com/axios/axios/issues/2654
import axios from 'axios';
axios.defaults.adapter = require('axios/lib/adapters/http');

describe('unit tests', () => {
  test('creates a div with a suitable class', async () => {
    const { container } = render(<ResidentTable />);
    expect(container.firstChild).toHaveClass('page');
  });
});

describe('contract tests', () => {
  pactWith(
    {
      consumer: 'App',
      provider: 'House',
    },
    (provider) => {
      beforeEach(() => {
        const wakeInteraction = {
          uponReceiving: 'a request for the resident to wake up',
          withRequest: {
            method: 'PUT',
            path: '/resident/wakeup',
          },
          willRespondWith: {
            status: 204,
          },
        };
        provider.addInteraction(wakeInteraction);

        const matchyResult = expectedResult;
        // in a few places there's a couple of values we could take, so use pact matchers
        matchyResult.hair.state = Matchers.term({
          generate: 'frizzled',
          matcher: '^(frizzled|combed)$',
        });
        matchyResult.torso.state = Matchers.term({
          generate: 'full',
          matcher: '^(full|hungry)$',
        });
        matchyResult.eyes.state = Matchers.term({
          generate: 'awake',
          matcher: '^(awake|asleep)$',
        });

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
            body: matchyResult,
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

      test('handles state for body parts with state', async () => {
        const { findByAltText } = render(<ResidentTable />);

        // This is leaking the internals of the body part a bit, but is a handy way to confirm state was handled correctly
        const image = await findByAltText('hair-frizzled');
        expect(image).toBeTruthy();
      });
    }
  );
});
