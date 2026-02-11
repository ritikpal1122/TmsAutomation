import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Folder Drag and Drop', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'Folder Management' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test('should drag folder into another and verify test case counts', async ({ projectOnly, testCasePage, folderPage }) => {
    // Create FolderA with 2 test cases
    await folderPage.createTestCasesInsideFolder('FolderA', testCasePage, 2);
    // Create FolderB with 2 test cases
    await folderPage.createTestCasesInsideFolder('FolderB', testCasePage, 2);

    // Drag FolderB into FolderA
    await folderPage.dragDropFolder('FolderB', 'FolderA');

    // Verify hierarchy and counts
    await folderPage.verifyFolderTestCaseCount('FolderA', '2/4');
    await folderPage.verifyFolderTestCaseCount('FolderB', '2/2');
  });
});
