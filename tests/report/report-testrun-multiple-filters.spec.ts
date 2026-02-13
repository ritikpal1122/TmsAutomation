import { test } from '../../src/fixtures/tms.fixture.js';
import { setupReportProject, configureReportFilters, generateAndVerifyReport } from '../../src/helpers/report-test.helper.js';

test.describe('Report - Test Runs with Multiple Filters', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'Reports' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test('should create a report with test runs filter and priority and status filters', async ({ projectPage, testCasePage, testRunPage, reportPage }) => {
    const opts = {
      projectPage, testCasePage, testRunPage, reportPage,
      primaryFilter: 'testRuns' as const,
      filters: [{ method: 'Priority' as const, value: 'High' }, { method: 'Status' as const, value: 'Draft' }],
    };
    await setupReportProject(opts);
    await configureReportFilters(opts);
    await generateAndVerifyReport(reportPage, 1);
    await projectPage.deleteProject();
  });
});
