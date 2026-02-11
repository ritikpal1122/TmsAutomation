import { test, expect } from '../../src/fixtures/tms.fixture.js';
import path from 'path';
import { TEST_DATA } from '../../src/config/constants.js';

test.describe('CSV Import - BDD', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'CSV Import BDD' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test('should import BDD CSV and verify test case and folder', async ({ projectOnly, csvImportPage }) => {
    const bddCsvPath = path.resolve('src/data', TEST_DATA.sampleBddCsvFile);

    // Step 3: Upload BDD CSV file
    await csvImportPage.uploadBddCsv(bddCsvPath);

    // Step 4: Full CSV import flow (next -> map fields -> next -> map values -> next -> preview -> import)
    await csvImportPage.clickNext();
    await csvImportPage.verifyMapFields();
    await csvImportPage.clickNext();
    await csvImportPage.verifyMapValues();
    await csvImportPage.clickNext();
    await csvImportPage.clickPreviewImport();
    await csvImportPage.clickImportTestCases();

    // Step 5: Verify imported test case is visible
    await csvImportPage.verifyImportedTestCase();
  });
});
