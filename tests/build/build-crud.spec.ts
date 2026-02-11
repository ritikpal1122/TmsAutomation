import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Build CRUD', {
  tag: ['@smoke', '@regression'],
  annotation: [
    { type: 'feature', description: 'Build Management' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test('should create, edit, duplicate, and verify build', async ({ projectWithTestCase, testRunPage, buildPage }) => {
    await testRunPage.createTestRun();
    await buildPage.createBuild();
    await buildPage.verifyBuildCreated();
    await buildPage.editBuild();
    await buildPage.duplicateBuild();
  });
});
