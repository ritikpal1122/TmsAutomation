import { test as tmsTest } from './tms.fixture.js';
import { EnvConfig } from '../config/env.config.js';

type ApiOnlyFixtures = {
  authToken: string;
};

export const test = tmsTest.extend<ApiOnlyFixtures>({
  authToken: async ({}, use) => {
    await use(EnvConfig.authToken);
  },
});

export { expect } from '@playwright/test';
