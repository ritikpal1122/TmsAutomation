// ──────────────────────────────────────────────────────────────
// RANDOM_LENGTH — Character counts for auto-generated test names
// ──────────────────────────────────────────────────────────────
export const RANDOM_LENGTH = {
  short: 5,       // Tags, suffixes
  medium: 8,      // Field names, dropdown values
  standard: 10,   // Project names, test case names
  long: 20,       // Descriptions
  extraLong: 30,  // Edited names (clearly different from original)
} as const;

// ──────────────────────────────────────────────────────────────
// TEST_DATA — File names and default values for test data
// ──────────────────────────────────────────────────────────────
// Base directories for test data files
export const DATA_DIRS = {
  attachments: 'src/data/attachments',
  csv: 'src/data/csv',
  images: 'src/data/images',
  apps: 'src/data/apps',
} as const;

export const TEST_DATA = {
  // CSV files → src/data/csv/
  sampleCsvFile: 'csv/sample_data.csv',
  sampleBddCsvFile: 'csv/sample_BDD_testStep.csv',
  sampleSelectionCsvFile: 'csv/sample_Selection.csv',
  // Attachments → src/data/attachments/
  sampleAttachment: 'attachments/sampleexample.txt',
  // Images → src/data/images/
  screenshotFile: 'images/Screenshot0.png',
  // Mobile apps → src/data/apps/
  androidApp: 'apps/QATestApp.apk',
  iosApp: 'apps/QATestApp.ipa',
  iosFLApp: 'apps/TMS_FL_APP.zip',
  // Default names
  defaultProjectName: 'LambdaTest Automation',
  runtimeTcName: 'RunTimeAutomationTestcase',
} as const;
