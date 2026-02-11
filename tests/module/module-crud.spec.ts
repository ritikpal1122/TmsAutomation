import { test, expect } from '../../src/fixtures/tms.fixture.js';
import { EnvConfig } from '../../src/config/env.config.js';

test.describe('Module CRUD', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'Module Management' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test('should create a module with steps', async ({ page, modulePage }) => {
    await page.goto(EnvConfig.tmsBaseUrl + '/module');
    await modulePage.createModuleWithDetails(['Step 1: Login', 'Step 2: Navigate']);
    await modulePage.verifyModuleCreated();
  });

  test('should insert a module into test case', async ({ projectWithTestCase, testCasePage, modulePage }) => {
    await testCasePage.openTestCase();
    await modulePage.insertModule();
  });
});
