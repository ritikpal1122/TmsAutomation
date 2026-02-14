import { type Page, expect, test } from '@playwright/test';
import { BasePage } from '../../utils/base.page.js';
import { FolderLocators as L } from './folder.locators.js';
import { TIMEOUTS, RANDOM_LENGTH } from '../../config/constants.js';
import { randomString } from '../../utils/random.helper.js';

export class FolderPage extends BasePage {
  folderName = `AutoFolder_${randomString(RANDOM_LENGTH.standard)}`;
  subFolderName = `AutoSubFolder_${randomString(RANDOM_LENGTH.standard)}`;
  newFolderName = `AutoFolder_${randomString(RANDOM_LENGTH.standard)}`;

  constructor(page: Page) {
    super(page);
  }

  async createFolder(name?: string): Promise<void> {
    const folder = name ?? this.folderName;
    await test.step('Create folder: ' + folder, async () => {
      await this.loc(L.createFolderButton).click();
      await this.loc(L.folderTitleField).fill(folder);
      await this.page.keyboard.press('Enter');
      await this.page.waitForTimeout(2000);
      await expect.soft(this.loc(L.createdFolder(folder))).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async createSubFolder(parentFolder: string, subFolderName?: string): Promise<void> {
    const subFolder = subFolderName ?? this.subFolderName;
    await test.step('Create sub-folder "' + subFolder + '" under "' + parentFolder + '"', async () => {
      await this.loc(L.createdFolder(parentFolder)).hover();
      await this.page.waitForTimeout(500);
      await this.loc(L.createSubFolderForFolder(parentFolder)).click();
      await this.page.waitForTimeout(1000);
      await this.loc(L.folderNameInput).fill(subFolder);
      await this.page.keyboard.press('Enter');
      await this.page.waitForTimeout(1000);
      await expect.soft(this.loc(L.createdFolder(subFolder))).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async renameFolder(oldName: string, newName?: string): Promise<void> {
    const folder = newName ?? this.newFolderName;
    await test.step('Rename folder "' + oldName + '" to "' + folder + '"', async () => {
      await this.loc(L.createdFolder(oldName)).hover();
      await this.page.waitForTimeout(500);
      await this.loc(L.folderOptionsMenu(oldName)).click();
      await this.loc(L.renameFolderButton).click();
      await this.page.waitForTimeout(500);
      const input = this.loc(L.renameInput);
      await input.clear();
      await input.fill(folder);
      await this.page.keyboard.press('Enter');
      await this.page.waitForTimeout(1000);
      await expect.soft(this.loc(L.createdFolder(folder))).toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  async deleteFolder(name?: string): Promise<void> {
    const folder = name ?? this.folderName;
    await test.step('Delete folder: ' + folder, async () => {
      if (await this.isVisible(L.createdFolder(folder))) {
        await this.loc(L.createdFolder(folder)).hover();
        await this.page.waitForTimeout(500);
        await this.loc(L.folderOptionsMenu(folder)).click();
        await this.loc(L.deleteFolderButton).click();
        await this.loc(L.deleteFolderConfirm).click();
        await expect.soft(this.loc(L.createdFolder(folder))).not.toBeVisible({ timeout: TIMEOUTS.medium });
      }
    });
  }

  async dragDropFolder(sourceFolder: string, targetFolder: string): Promise<void> {
    await test.step('Drag folder "' + sourceFolder + '" into "' + targetFolder + '"', async () => {
      const sourceHandle = this.loc(L.folderDragHandle(sourceFolder));
      const targetNode = this.loc(L.folderTreeItem(targetFolder));

      // Drag the folder icon (which has draggable=true + cursor:move) to the target treenode
      await sourceHandle.dragTo(targetNode, { force: true });
      await this.page.waitForTimeout(2000);

      // Reload to get fresh tree state from the server after drag
      await this.page.reload({ waitUntil: 'domcontentloaded' });
      await this.page.waitForTimeout(2000);

      // Click on target folder name to navigate into it and reveal children in sidebar
      await this.loc(L.createdFolder(targetFolder)).click();
      await this.page.waitForTimeout(2000);

      await expect.soft(this.loc(L.createdFolder(sourceFolder))).toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  async copyTestCases(testCaseCount: number, targetFolder: string): Promise<void> {
    await test.step('Copy ' + testCaseCount + ' test cases to folder "' + targetFolder + '"', async () => {
      await this.loc(L.allTestCasesButton).click();
      await this.page.waitForTimeout(1000);
      for (let i = 0; i < testCaseCount; i++) {
        await this.loc(L.testCaseCheckbox).nth(i).click();
      }
      await this.loc(L.bulkActionsButton).click();
      await this.loc(L.copyTestCasesButton).click();
      await this.page.waitForTimeout(1000);
      await this.loc(L.selectFolder(targetFolder)).click();
      await this.loc(L.copyTestCasesConfirm).click();
      await expect.soft(this.loc(L.testCasesCopiedSuccess)).toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  async moveTestCases(testCaseCount: number, targetFolder: string): Promise<void> {
    await test.step('Move ' + testCaseCount + ' test cases to folder "' + targetFolder + '"', async () => {
      await this.loc(L.allTestCasesButton).click();
      await this.page.waitForTimeout(1000);
      for (let i = 0; i < testCaseCount; i++) {
        await this.loc(L.testCaseCheckbox).nth(i).click();
      }
      await this.loc(L.bulkActionsButton).click();
      await this.loc(L.moveTestCasesButton).click();
      await this.page.waitForTimeout(1000);
      await this.loc(L.selectFolder(targetFolder)).click();
      await this.loc(L.moveTestCasesConfirm).click();
      await expect.soft(this.loc(L.testCasesMovedSuccess)).toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  async copyTestCasesToProject(testCaseCount: number, targetProject: string, targetFolder: string): Promise<void> {
    await test.step('Copy ' + testCaseCount + ' test cases to project "' + targetProject + '" folder "' + targetFolder + '"', async () => {
      await this.loc(L.allTestCasesButton).click();
      await this.page.waitForTimeout(1000);
      for (let i = 0; i < testCaseCount; i++) {
        await this.loc(L.testCaseCheckbox).nth(i).click();
      }
      await this.loc(L.bulkActionsButton).click();
      await this.loc(L.copyTestCasesButton).click();
      await this.page.waitForTimeout(1000);
      // Change project in copy panel
      await this.loc(L.copyMoveProjectDropdown).click();
      await this.page.waitForTimeout(500);
      await this.loc(L.filterProjectsInput).fill(targetProject);
      await this.page.waitForTimeout(500);
      await this.loc(L.projectOption(targetProject)).click();
      await this.page.waitForTimeout(1000);
      // Select folder in target project
      await this.loc(L.selectFolder(targetFolder)).click();
      await this.loc(L.copyTestCasesConfirm).click();
      await expect.soft(this.loc(L.testCasesCopiedSuccess)).toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  async moveTestCasesToProject(testCaseCount: number, targetProject: string, targetFolder: string): Promise<void> {
    await test.step('Move ' + testCaseCount + ' test cases to project "' + targetProject + '" folder "' + targetFolder + '"', async () => {
      await this.loc(L.allTestCasesButton).click();
      await this.page.waitForTimeout(1000);
      for (let i = 0; i < testCaseCount; i++) {
        await this.loc(L.testCaseCheckbox).nth(i).click();
      }
      await this.loc(L.bulkActionsButton).click();
      await this.loc(L.moveTestCasesButton).click();
      await this.page.waitForTimeout(1000);
      // Change project in move panel
      await this.loc(L.copyMoveProjectDropdown).click();
      await this.page.waitForTimeout(500);
      await this.loc(L.filterProjectsInput).fill(targetProject);
      await this.page.waitForTimeout(500);
      await this.loc(L.projectOption(targetProject)).click();
      await this.page.waitForTimeout(1000);
      // Select folder in target project
      await this.loc(L.selectFolder(targetFolder)).click();
      await this.loc(L.moveTestCasesConfirm).click();
      await expect.soft(this.loc(L.testCasesMovedSuccess)).toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  async createTestCasesInsideFolder(folderName: string, testCasePage: { createTestCase: (title?: string) => Promise<void> }, count: number): Promise<void> {
    await test.step(`Create folder "${folderName}" with ${count} test cases`, async () => {
      await this.createFolder(folderName);
      await this.openFolder(folderName);
      for (let i = 1; i <= count; i++) {
        await testCasePage.createTestCase(`${folderName}_TC_${i}`);
      }
    });
  }

  async verifyFolderTestCaseCount(folderName: string, expectedCount: string): Promise<void> {
    await test.step(`Verify folder "${folderName}" shows count "${expectedCount}"`, async () => {
      await expect.soft(this.loc(L.folderTestCaseCount(folderName))).toHaveText(expectedCount, { timeout: TIMEOUTS.long });
    });
  }

  async openFolder(name: string): Promise<void> {
    await this.loc(L.createdFolder(name)).click();
    await this.page.waitForTimeout(1000);
    await expect.soft(this.loc(L.folderBreadcrumb(name))).toBeVisible({ timeout: TIMEOUTS.medium });
  }

  async verifyFolderExists(name: string): Promise<void> {
    await expect.soft(this.loc(L.createdFolder(name))).toBeVisible({ timeout: TIMEOUTS.medium });
  }

  async verifyFolderDeleted(name: string): Promise<void> {
    await expect.soft(this.loc(L.createdFolder(name))).not.toBeVisible({ timeout: TIMEOUTS.medium });
  }

  async expandFolder(name: string): Promise<void> {
    await this.loc(L.folderExpandIcon(name)).click();
    await this.page.waitForTimeout(1000);
  }

  async collapseFolder(name: string): Promise<void> {
    await this.loc(L.folderCollapseIcon(name)).click();
    await this.page.waitForTimeout(1000);
  }
}
