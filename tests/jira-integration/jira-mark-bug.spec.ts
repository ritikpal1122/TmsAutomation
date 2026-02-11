import { test, expect } from '../../src/fixtures/tms.fixture.js';
import { RETRY } from '../../src/config/constants.js';
import { randomString } from '../../src/utils/random.helper.js';
import { RANDOM_LENGTH } from '../../src/config/constants.js';

test.describe('Jira Mark Bug from Automation', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'Jira Integration' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test.describe.configure({ retries: RETRY.jiraRetries });

  test('should mark a bug from automation dashboard via Jira', async ({
    automationPage,
    jiraPage,
  }) => {
    // Open the automation sidebar and default project
    await automationPage.openAutomationSidebar();
    await automationPage.openDefaultProject();

    // Create a bug from automation via Jira integration
    const bugSummary = `AutoBug_${randomString(RANDOM_LENGTH.standard)}`;
    await jiraPage.createBugFromAutomation(bugSummary);

    // Verify linked issue details are visible
    await jiraPage.verifyLinkedIssueDetails();
  });
});
