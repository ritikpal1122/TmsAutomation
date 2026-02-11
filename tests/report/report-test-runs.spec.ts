import { test } from '../../src/fixtures/tms.fixture.js';
import { setupReportProject, configureReportFilters, generateAndVerifyReport } from '../../src/helpers/report-test.helper.js';

test.describe('Report - Test Runs Filter', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'Reports' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test('should create a report with test runs filter', async ({ projectPage, testCasePage, testRunPage, reportPage }) => {
    const opts = { projectPage, testCasePage, testRunPage, reportPage, primaryFilter: 'testRuns' as const, filters: [] };
    await setupReportProject(opts);
    await configureReportFilters(opts);
    await generateAndVerifyReport(reportPage);
    await projectPage.deleteProject();
  });
});
