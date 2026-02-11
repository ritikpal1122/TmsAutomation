import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('KaneAI Automate', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'KaneAI Integration' },
    { type: 'severity', description: 'minor' },
  ],
}, () => {
  test('should automate test case with KaneAI', async ({ projectWithTestCase, testCasePage, kaneaiPage }) => {
    await testCasePage.openTestCase();
    await kaneaiPage.automateWithKaneai();
    await kaneaiPage.selectDesktopBrowser();
    await kaneaiPage.startTesting();
    await kaneaiPage.approve();
    await kaneaiPage.saveTestCase();
  });
});
