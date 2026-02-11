import { test, expect } from '../../src/fixtures/tms.fixture.js';
import { EnvConfig } from '../../src/config/env.config.js';
import { randomString } from '../../src/utils/random.helper.js';
import { RANDOM_LENGTH } from '../../src/config/constants.js';

test.describe('Configuration - Falcon Android', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'Configuration Management' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test('should create a Falcon Android configuration and delete it', async ({ page, configPage }) => {
    await page.goto(EnvConfig.tmsBaseUrl + '/configurations');

    const configName = `Falcon_Android_${randomString(RANDOM_LENGTH.medium)}`;
    await configPage.createFalconConfiguration({
      name: configName,
      osType: 'Android',
      osVersion: '14.0',
      browser: 'Chrome',
      browserVersion: 'Latest',
      resolution: '1920x1080',
    });

    await configPage.verifyConfigurationExists(configName);
    await configPage.deleteConfiguration(configName);
    await configPage.verifyConfigurationDeleted(configName);
  });
});
