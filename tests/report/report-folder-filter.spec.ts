import { test } from '../../src/fixtures/tms.fixture.js';
import { setupReportProject, configureReportFilters, generateAndVerifyReport, USE_FOLDER_NAME } from '../../src/helpers/report-test.helper.js';

test.describe('Report - Folder Filter', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'Reports' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test('should create a Detailed Execution History report with folder filter', async ({ projectPage, folderPage, testCasePage, reportPage }) => {
    const opts = {
      projectPage, testCasePage, reportPage, folderPage,
      folder: true, skipTestRun: true,
      filters: [{ method: 'Folder', value: USE_FOLDER_NAME }],
    };
    await setupReportProject(opts);
    await configureReportFilters(opts);
    await generateAndVerifyReport(reportPage, 1);
    await projectPage.deleteProject();
  });
});
