import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('Copy/Move Test Cases to Different Project', {
  tag: ['@regression', '@folder'],
  annotation: [
    { type: 'feature', description: 'Folder Management' },
    { type: 'severity', description: 'critical' },
  ],
}, () => {
  test('should copy and move test cases across projects', async ({
    page,
    projectPage,
    testCasePage,
    folderPage,
  }) => {
    test.setTimeout(300_000);

    // Step 1: Create first project with a test case
    await projectPage.createProjectWithTagDescription();
    const firstProjectName = projectPage.projectName;
    await projectPage.openProject(firstProjectName);
    await testCasePage.createTestCase();

    // Step 2: Go back and create second project with a folder
    await projectPage.backToProjectList();
    const secondProjectName = projectPage.futureProjectName;
    projectPage.projectName = secondProjectName;
    await projectPage.createProjectWithTagDescription();
    await projectPage.openProject(secondProjectName);
    await folderPage.createFolder();

    // Step 3: Go back to first project
    await projectPage.openProject(firstProjectName);

    // Step 4: Copy test case to folder in second project
    await folderPage.copyTestCasesToProject(1, secondProjectName, folderPage.folderName);

    // Step 5: Open second project, verify test case was copied
    await projectPage.openProject(secondProjectName);
    await folderPage.openFolder(folderPage.folderName);
    await expect.soft(page.locator(`//a[text()='${testCasePage.testCaseTitle}']`)).toBeVisible({ timeout: 30000 });

    // Step 6: Go back to first project for move
    await projectPage.openProject(firstProjectName);

    // Step 7: Move test case to folder in second project
    await folderPage.moveTestCasesToProject(1, secondProjectName, folderPage.folderName);

    // Step 8: Navigate away to clear page state before cleanup
    await page.goto('about:blank', { waitUntil: 'commit' });

    // Step 9: Cleanup both projects
    await projectPage.deleteProject(firstProjectName);
    await projectPage.deleteProject(secondProjectName);
  });
});
