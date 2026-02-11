import { test, expect } from '../../src/fixtures/tms.fixture.js';
import { RETRY } from '../../src/config/constants.js';

test.describe('Jira Dashboard Verification', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'Jira Integration' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test.describe.configure({ retries: RETRY.jiraRetries });

  test('should verify Jira integration details on automation dashboard', async ({
    automationPage,
    insightsPage,
  }) => {
    // Open automation project
    await automationPage.openAutomationProject();

    // Navigate to insights and verify labels and charts are visible
    await insightsPage.navigateToInsights();
    await insightsPage.verifyInsightsLabelsVisible();
    await insightsPage.verifyChartSectionsVisible();
  });
});
