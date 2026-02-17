import { type Page, expect, test } from '@playwright/test';
import { BasePage } from '../../utils/base.page.js';
import { ProjectLocators as L } from './project.locators.js';
import { TIMEOUTS, RETRY, RANDOM_LENGTH } from '../../config/constants.js';
import { randomString } from '../../utils/random.helper.js';
import { EnvConfig } from '../../config/env.config.js';
import { waitForNetworkIdle, fillAndWaitForSearch } from '../../utils/wait.helper.js';
import { retryAction } from '../../utils/retry.helper.js';

export class ProjectPage extends BasePage {
  projectName = `AutoProject_${randomString(RANDOM_LENGTH.standard)}`;
  futureProjectName = `AutoProject_${randomString(RANDOM_LENGTH.standard)}`;

  constructor(page: Page) {
    super(page);
  }

  async createProjectWithTagDescription(
    options: { tag?: boolean; description?: boolean } = {},
  ): Promise<void> {
    const { tag = true, description = true } = options;
    await test.step('Create project with tag and description', async () => {
      await this.loc(L.createProjectBtn).click();
      await this.loc(L.projectTitle).first().waitFor({ state: 'visible', timeout: TIMEOUTS.long });
      await this.loc(L.projectTitle).first().fill(this.projectName);
      if (description) {
        await this.loc(L.projectDescription).first().fill(randomString(RANDOM_LENGTH.standard));
      }
      if (tag) {
        const tagInput = this.loc(L.projectTag).first();
        await tagInput.click();
        await tagInput.fill(randomString(RANDOM_LENGTH.standard));
        await this.page.keyboard.press('Enter');
      }
      await this.loc(L.projectCreate).first().click();
      await expect.soft(this.loc(L.createdProject(this.projectName))).toBeVisible({ timeout: TIMEOUTS.long });
    });
  }

  async openProject(name?: string): Promise<void> {
    await test.step(`Open project ${name ?? this.projectName}`, async () => {
      const projectName = name ?? this.projectName;
      // Navigate to projects list
      await this.page.goto(EnvConfig.tmsBaseUrl, { waitUntil: 'domcontentloaded' });
      await this.page.keyboard.press('Escape');
      await this.loc(L.searchProject).waitFor({ state: 'visible', timeout: TIMEOUTS.long });

      // Retry search up to 3 times (newly created projects may take time to appear)
      await retryAction(this.page, async () => {
        await this.page.keyboard.press('Escape');

        const el = this.loc(L.searchProject);
        await el.click();
        await el.fill(projectName);
        // fill() alone doesn't trigger the React search — press Enter to submit
        await this.page.keyboard.press('Enter');

        const projectLink = this.loc(L.createdProject(projectName));
        await expect(projectLink).toBeVisible({ timeout: TIMEOUTS.medium });
        await projectLink.click();
      }, {
        retries: RETRY.defaultAttempts,
        delayMs: RETRY.delayBetweenMs,
        label: `openProject(${projectName})`,
      });
    });
  }

  async editProject(): Promise<void> {
    await test.step('Edit project name', async () => {
      await this.loc(L.projectTripleDotButton(this.projectName)).first().click();
      await this.loc(L.projectEditButton).waitFor({ state: 'visible', timeout: TIMEOUTS.short });
      await this.loc(L.projectEditButton).click();
      await this.loc(L.projectTitle).clear();
      this.projectName = randomString(RANDOM_LENGTH.extraLong);
      await this.loc(L.projectTitle).fill(this.projectName);
      await this.loc(L.saveChangesButton).click();
      await waitForNetworkIdle(this.page);
    });
  }

  async deleteProject(name?: string): Promise<void> {
    await test.step(`Delete project ${name ?? this.projectName}`, async () => {
      const projectName = name ?? this.projectName;

      // Navigate to projects list only if not already there
      if (!(await this.isVisible(L.searchProject, TIMEOUTS.short))) {
        await this.page.goto(EnvConfig.tmsBaseUrl, { waitUntil: 'domcontentloaded' });
        await this.page.keyboard.press('Escape');
        await this.loc(L.searchProject).waitFor({ state: 'visible', timeout: TIMEOUTS.long });
      }

      const searchInput = this.loc(L.searchProject);
      await searchInput.click();
      await searchInput.fill(projectName);
      // fill() alone doesn't trigger the React search — press Enter to submit
      await this.page.keyboard.press('Enter');

      // Wait for search result directly instead of generic waitForNetworkIdle
      const projectLink = this.loc(L.createdProject(projectName));
      if (!(await this.isVisible(L.createdProject(projectName), TIMEOUTS.medium))) {
        return; // Project not found (already deleted or never existed)
      }

      await this.page.keyboard.press('Escape');

      // Retry: open menu + click Delete in one atomic action (menu can close between attempts)
      await retryAction(this.page, async () => {
        await this.page.keyboard.press('Escape');
        await this.loc(L.projectTripleDotButton(projectName)).first().click({ force: true });
        await this.loc(L.projectDeleteButton).waitFor({ state: 'visible', timeout: TIMEOUTS.short });
        // Force-click to bypass animation stability check (dropdown has enter animation)
        await this.loc(L.projectDeleteButton).click({ force: true, timeout: TIMEOUTS.short });
      }, { retries: 3, delayMs: 1_000, label: `deleteProject-menu(${projectName})` });

      const confirmInput = this.loc(L.projectDeleteConfirmInput);
      await confirmInput.waitFor({ state: 'visible', timeout: TIMEOUTS.medium });
      await confirmInput.fill('DELETE');
      await this.loc(L.projectDeleteConfirmation).waitFor({ state: 'visible', timeout: TIMEOUTS.medium });
      await this.loc(L.projectDeleteConfirmation).click();
      await expect(projectLink).not.toBeVisible({ timeout: TIMEOUTS.medium });
    });
  }

  async verifyProjectDeleted(): Promise<void> {
    await expect.soft(this.loc(L.createdProject(this.projectName))).not.toBeVisible({ timeout: TIMEOUTS.medium });
  }

  async backToProjectList(): Promise<void> {
    await this.loc(L.backToProjectList).click();
  }
}
