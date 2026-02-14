import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Copy and Move Test Cases', {
  tag: ['@regression' , "@folder"],
  annotation: [
    { type: 'feature', description: 'Folder Management' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test('should copy test cases between folders', async ({ projectWithTestCase, folderPage }) => {
    await folderPage.createFolder();
    await folderPage.copyTestCases(1, folderPage.folderName);
  });

  test('should move test cases between folders', async ({ projectWithTestCase, folderPage }) => {
    await folderPage.createFolder();
    await folderPage.moveTestCases(1, folderPage.folderName);
  });
});