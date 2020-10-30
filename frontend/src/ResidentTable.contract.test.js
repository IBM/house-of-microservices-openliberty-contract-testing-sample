import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import { Matchers } from '@pact-foundation/pact';
const { pactWith } = require('jest-pact');
import expectedResult from './expectedResult.json';

import ResidentTable from './Components/ResidentTable';

// Workaround for CORS complaints; see https://github.com/axios/axios/issues/2654
import axios from 'axios';
axios.defaults.adapter = require('axios/lib/adapters/http');

pactWith(
  {
    consumer: 'App',
    provider: 'House',
  },
  (provider) => {
    beforeEach(() => {
      // Globally update the port to the one pact set
      axios.defaults.baseURL = provider.mockService.baseUrl;

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

      matchyResult.room = Matchers.term({
        generate: 'kitchen',
        matcher: '^(kitchen|bedroom|bathroom)$',
      });

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
          body: matchyResult,
        },
      };
      return provider.addInteraction(interaction);
    });

    // For convenience, these tests are exactly the same as the unit tests; usually there should be
    // more unit tests than contract tests
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
  }
);
