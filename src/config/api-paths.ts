// ──────────────────────────────────────────────────────────────
// API_PATHS — Backend API endpoint patterns (appended to tmsApiUrl)
// ──────────────────────────────────────────────────────────────
export const API_PATHS = {
  projects: '/api/v1/projects',
  project: (id: string) => `/api/v1/projects/${id}`,
  testCases: (projectId: string) => `/api/v1/projects/${projectId}/test-cases`,
  testCase: (projectId: string, testCaseId: string) => `/api/v1/projects/${projectId}/test-cases/${testCaseId}`,
  testRuns: (projectId: string) => `/api/v1/projects/${projectId}/test-runs`,
  testRun: (projectId: string, testRunId: string) => `/api/v1/projects/${projectId}/test-runs/${testRunId}`,
} as const;
