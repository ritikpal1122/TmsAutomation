import type { ProjectPage } from '../pages/project/project.page.js';
import type { TestCasePage } from '../pages/test-case/test-case.page.js';
import type { TestRunPage } from '../pages/test-run/test-run.page.js';
import type { ReportPage } from '../pages/report/report.page.js';
import type { FolderPage } from '../pages/folder/folder.page.js';
import { createProjectWithTestCase } from './common-setup.helper.js';

/** Supported filter method names — must match ReportPage select/set method pairs */
export type FilterMethod = 'Priority' | 'Status' | 'Folder' | 'AutomationStatus' | 'Type' | 'Tags' | 'CreatedBy' | 'LinkedIssues';

export type ReportFilter = { method: FilterMethod; value: string };

type FilterAction = {
  select: (rp: ReportPage) => Promise<void>;
  setValue: (rp: ReportPage, v: string) => Promise<void>;
};

const FILTER_ACTIONS: Record<FilterMethod, FilterAction> = {
  Priority: {
    select: (rp) => rp.selectPriorityFilter(),
    setValue: (rp, v) => rp.setPriorityFilterValue(v),
  },
  Status: {
    select: (rp) => rp.selectStatusFilter(),
    setValue: (rp, v) => rp.setStatusFilterValue(v),
  },
  Folder: {
    select: (rp) => rp.selectFolderFilter(),
    setValue: (rp, v) => rp.setFolderFilterValue(v),
  },
  AutomationStatus: {
    select: (rp) => rp.selectAutomationStatusFilter(),
    setValue: (rp, v) => rp.setAutomationStatusFilterValue(v),
  },
  Type: {
    select: (rp) => rp.selectTypeFilter(),
    setValue: (rp, v) => rp.setTypeFilterValue(v),
  },
  Tags: {
    select: (rp) => rp.selectTagsFilter(),
    setValue: (rp, v) => rp.setTagsFilterValue(v),
  },
  CreatedBy: {
    select: (rp) => rp.selectCreatedByFilter(),
    setValue: (rp, v) => rp.setCreatedByFilterValue(v),
  },
  LinkedIssues: {
    select: (rp) => rp.selectLinkedIssuesFilter(),
    setValue: (rp, v) => rp.setLinkedIssuesFilterValue(v),
  },
};

/** Use as filter value to auto-resolve the created folder name at runtime */
export const USE_FOLDER_NAME = '__folderName__' as const;

type ReportSetupOptions = {
  projectPage: ProjectPage;
  testCasePage: TestCasePage;
  reportPage: ReportPage;
  testRunPage?: TestRunPage;
  folderPage?: FolderPage;
  /** 'dateRange' (default) or 'testRuns' */
  primaryFilter?: 'dateRange' | 'testRuns';
  /** Test case filters to apply. Empty = no filters */
  filters?: ReportFilter[];
  /** Skip test run creation (e.g. for folder-only tests) */
  skipTestRun?: boolean;
  /** Create a folder and place the test case inside it */
  folder?: boolean;
};

/**
 * Shared setup for report filter tests.
 * Creates project → (optional folder) → test case → (optional test run).
 * Does NOT generate or verify — call those separately in your test.
 */
export async function setupReportProject(opts: ReportSetupOptions): Promise<void> {
  const { testRunPage } = opts;

  await createProjectWithTestCase({
    projectPage: opts.projectPage,
    testCasePage: opts.testCasePage,
    folderPage: opts.folderPage,
    folder: opts.folder,
  });

  if (!opts.skipTestRun && testRunPage) {
    await testRunPage.createTestRun();
  }
}

/**
 * Configure report creation with primary filter + optional test case filters.
 * Call after setupReportProject() and reportPage.openReportsTab().
 */
export async function configureReportFilters(opts: ReportSetupOptions): Promise<void> {
  const { reportPage, testRunPage, folderPage } = opts;
  const primaryFilter = opts.primaryFilter ?? 'dateRange';
  const filters = opts.filters ?? [];

  await reportPage.openReportsTab();
  await reportPage.startReportCreation('Detailed Execution History');
  await reportPage.enterReportName();
  await reportPage.enterReportDescription();

  // Primary filter
  if (primaryFilter === 'dateRange') {
    await reportPage.selectDateRangeFilter();
    await reportPage.selectDateRangePreset('Last 30 Days');
  } else if (testRunPage) {
    await reportPage.selectTestRunsFilter();
    await reportPage.searchTestRun(testRunPage.testRunName);
    await reportPage.selectTestRun(testRunPage.testRunName);
  }

  // Test case filters
  if (filters.length > 0) {
    await reportPage.enableTestCasesFilter();
    for (const f of filters) {
      const action = FILTER_ACTIONS[f.method];
      const value = f.value === USE_FOLDER_NAME && folderPage ? folderPage.folderName : f.value;
      await action.select(reportPage);
      await action.setValue(reportPage, value);
    }
  }
}

/**
 * Generate report + poll + verify test case count.
 * Call after configureReportFilters().
 */
export async function generateAndVerifyReport(
  reportPage: ReportPage,
  expectedCount?: number,
): Promise<void> {
  await reportPage.clickContinue();
  await reportPage.clickGenerateReport();

  if (expectedCount !== undefined) {
    await reportPage.pollForReportGeneration();
    await reportPage.verifyReportCreated();
    await reportPage.searchCreatedReport();
    await reportPage.openCreatedReport();
    await reportPage.verifyReportTestCaseCount(expectedCount);
  } else {
    await reportPage.verifyReportCreated();
  }
}
