import type { ProjectPage } from '../pages/project/project.page.js';
import type { TestCasePage } from '../pages/test-case/test-case.page.js';
import type { FolderPage } from '../pages/folder/folder.page.js';

type SetupOptions = {
  projectPage: ProjectPage;
  testCasePage: TestCasePage;
  folderPage?: FolderPage;
  /** Set true to create a folder and place the test case inside it */
  folder?: boolean;
};

/**
 * Common project setup: create project → open it → (optional folder) → create test case.
 * Use `folder: true` to create a test case inside a new folder.
 */
export async function createProjectWithTestCase(opts: SetupOptions): Promise<void> {
  const { projectPage, testCasePage, folderPage } = opts;

  await projectPage.createProjectWithTagDescription();
  await projectPage.openProject();

  if (opts.folder && folderPage) {
    await folderPage.createFolder();
    await folderPage.openFolder(folderPage.folderName);
  }

  await testCasePage.createTestCase();
}
