// ──────────────────────────────────────────────────────────────
// Tags & Annotations — Typed constants for test metadata
// ──────────────────────────────────────────────────────────────

export const Tags = {
  smoke: '@smoke',
  regression: '@regression',
  project: '@project',
  api: '@api',
  testRun: '@test-run',
  testCase: '@test-case',
  report: '@report',
  folder: '@folder',
  milestone: '@milestone',
  settings: '@settings',
  configuration: '@configuration',
  jira: '@jira',
  insights: '@insights',
  dataset: '@dataset',
  csvImport: '@csv-import',
  build: '@build',
  sdk: '@sdk',
  kaneai: '@kaneai',
  automation: '@automation',
} as const;

export const Severity = {
  critical: 'critical',
  normal: 'normal',
  minor: 'minor',
} as const;

export const Feature = {
  projectManagement: 'Project Management',
  testCaseManagement: 'Test Case Management',
  testRunManagement: 'Test Run Management',
  reportManagement: 'Report Management',
  folderManagement: 'Folder Management',
  milestoneManagement: 'Milestone Management',
  insightsDashboard: 'Insights Dashboard',
  jiraIntegration: 'Jira Integration',
  datasetManagement: 'Dataset Management',
  configurationManagement: 'Configuration Management',
  csvImport: 'CSV Import',
  customFields: 'Custom Fields',
  sdkIntegration: 'SDK Integration',
  kaneai: 'KaneAI',
  buildManagement: 'Build Management',
  automationMapping: 'Automation Mapping',
} as const;

/** Helper to create feature annotation */
export function feature(name: string) {
  return { type: 'feature' as const, description: name };
}

/** Helper to create severity annotation */
export function severity(level: string) {
  return { type: 'severity' as const, description: level };
}
