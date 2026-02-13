import { test } from '../../src/fixtures/tms.fixture.js';
import { setupReportProject, configureReportFilters, generateAndVerifyReport } from '../../src/helpers/report-test.helper.js';

test.describe('Report - Priority, Status, and Automation Status Filters', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'Reports' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test('should create a report with priority, status, and automation status filters', async ({ projectPage, testCasePage, testRunPage, reportPage }) => {
    const opts = {
      projectPage, testCasePage, testRunPage, reportPage,
      filters: [
        { method: 'Priority' as const, value: 'High' },
        { method: 'Status' as const, value: 'Draft' },
        { method: 'AutomationStatus' as const, value: 'Not Automated' },
      ],
    };
    await setupReportProject(opts);
    await configureReportFilters(opts);
    await generateAndVerifyReport(reportPage, 1);
    await projectPage.deleteProject();
  });
});
