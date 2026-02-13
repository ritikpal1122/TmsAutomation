// ──────────────────────────────────────────────────────────────
// TIMEOUTS — How long to wait before considering something failed
// ──────────────────────────────────────────────────────────────
export const TIMEOUTS = {
  short: 5_000,         // 5 sec  — quick checks (element exists?)
  medium: 15_000,       // 15 sec — search results, dropdowns
  long: 30_000,         // 30 sec — page loads, form submissions
  extraLong: 60_000,    // 60 sec — heavy pages, file uploads
  pageLoad: 60_000,     // 60 sec — full page navigation
  animation: 2_000,     // 2 sec  — CSS animations / transitions
  poll: 10_000,         // 10 sec — single polling interval
  reportGeneration: 420_000, // 7 min — report PDF generation
} as const;

// ──────────────────────────────────────────────────────────────
// RETRY — How many times to retry a flaky or async action
// ──────────────────────────────────────────────────────────────
export const RETRY = {
  defaultAttempts: 3,      // Standard retry count for most actions
  delayBetweenMs: 2_000,   // 2 sec pause between retry attempts

  // Per-feature retry overrides (used in test.describe.configure)
  insightsRetries: 2,      // Insights page — data sync can be slow
  jiraRetries: 3,          // Jira integration — external API dependency
  ciRetries: 2,            // CI pipeline — automatic retries on failure
} as const;

// ──────────────────────────────────────────────────────────────
// POLL — Long-running polling for async data (API sync, reports)
// ──────────────────────────────────────────────────────────────
export const POLL = {
  maxWaitSeconds: 120,         // 2 min  — general polling timeout
  intervalSeconds: 10,         // 10 sec — pause between poll attempts
  insightsTimeoutSeconds: 300, // 5 min  — Insights data may take longer to sync
} as const;

// ──────────────────────────────────────────────────────────────
// CI — Settings specific to CI/CD pipeline execution
// ──────────────────────────────────────────────────────────────
export const CI_CONFIG = {
  workers: 3,           // Number of parallel browser instances in CI
  retries: RETRY.ciRetries,
} as const;
