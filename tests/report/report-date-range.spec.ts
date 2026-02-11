import { test } from '../../src/fixtures/tms.fixture.js';
import { setupReportProject, configureReportFilters, generateAndVerifyReport } from '../../src/helpers/report-test.helper.js';

test.describe('Report - Date Range Filter', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'Reports' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test('should create a Detailed Execution History report with date range', async ({ projectPage, testCasePage, testRunPage, reportPage }) => {
    const opts = { projectPage, testCasePage, testRunPage, reportPage, filters: [] };
    await setupReportProject(opts);
    await configureReportFilters(opts);
    await generateAndVerifyReport(reportPage);
    await projectPage.deleteProject();
  });
});
