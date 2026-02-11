import { test } from '../../src/fixtures/tms.fixture.js';
import { setupReportProject, configureReportFilters, generateAndVerifyReport } from '../../src/helpers/report-test.helper.js';

test.describe('Report - Status Filter', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'Reports' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test('should create a report with status filter', async ({ projectPage, testCasePage, testRunPage, reportPage }) => {
    const opts = { projectPage, testCasePage, testRunPage, reportPage, filters: [{ method: 'Status', value: 'Draft' }] };
    await setupReportProject(opts);
    await configureReportFilters(opts);
    await generateAndVerifyReport(reportPage, 1);
    await projectPage.deleteProject();
  });
});
