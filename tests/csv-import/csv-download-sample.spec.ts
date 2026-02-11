import { test, expect } from '../../src/fixtures/tms.fixture.js';

test.describe('CSV Import - Download Sample', {
  tag: ['@regression'],
  annotation: [
    { type: 'feature', description: 'CSV Import' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test('should download sample CSV template and verify', async ({ projectOnly, page, csvImportPage }) => {
    // Step 3: Download sample CSV template and verify the download completes
    const downloadPromise = page.waitForEvent('download');
    await csvImportPage.downloadSampleCsv();
    const download = await downloadPromise;

    // Step 4: Verify the downloaded file exists and has a valid filename
    expect(download.suggestedFilename()).toContain('.csv');
  });
});
