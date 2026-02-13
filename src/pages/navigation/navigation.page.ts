import { type Page, test } from '@playwright/test';
import { BasePage } from '../base.page.js';
import { NavigationLocators as L } from './navigation.locators.js';
import { TIMEOUTS } from '../../config/constants.js';

export class NavigationPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async openTMS(): Promise<void> {
    await test.step('Open TMS from sidebar navigation', async () => {
      if (await this.isVisible(L.hamburgerSidebar, TIMEOUTS.medium)) {
        await this.loc(L.hamburgerSidebar).click();
      }
      await this.loc(L.projectList).click();
      await this.loc(L.tmsVisible).waitFor({ state: 'visible' });
    });
  }

  async navigateToTestCases(): Promise<void> {
    await this.loc(L.testCaseNav).click();
  }

  async navigateToTestRuns(): Promise<void> {
    await this.loc(L.testRunNav).click();
  }

  async navigateToBuilds(): Promise<void> {
    await this.loc(L.buildNav).click();
  }

  async navigateToSettings(): Promise<void> {
    await this.loc(L.sidebarSettings).click();
  }

  async navigateToSystemFields(): Promise<void> {
    await this.loc(L.settingStage).click();
  }

  async navigateToInsights(): Promise<void> {
    await this.loc(L.insightPageNav).click();
  }

  async navigateToAutomation(): Promise<void> {
    await this.loc(L.automationSidebar).click();
  }

  async navigateToKaneAI(): Promise<void> {
    await this.loc(L.kaneaiSidebar).click();
  }

  async navigateToModules(): Promise<void> {
    await this.loc(L.moduleSidebar).click();
  }

  async navigateToReports(): Promise<void> {
    await this.loc(L.reportsTab).click();
  }

  async openTMSFalcon(): Promise<void> {
    await this.loc(L.tmsCtaFalcon).click();
  }
}
