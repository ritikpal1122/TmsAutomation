import { test, expect } from "../../src/fixtures/tms.fixture.js";


test.describe.serial('Dataset Copy', {
  tag: ['@regression' ],
  annotation: [
    { type: 'feature', description: 'Dataset Management' },
    { type: 'severity', description: 'normal' },
  ],
}, () => {
  test('should copy a dataset', async ({ datasetPage }) => {
    await datasetPage.createDatasetWithDetails();
    await datasetPage.copyDataset();
  });
});