// ──────────────────────────────────────────────────────────────
// JIRA — Jira integration constants
// ──────────────────────────────────────────────────────────────
export const JIRA = {
  issueEndpoint: '/issue/',
  testMuTriggerComment: '@TestMu AI Cloud test this',
  lambdatestAiResponsePrefix: 'LambdaTest AI Cloud',
  lambdatestAiResponseContains: 'I have started generating test scenarios',
  loginScenarioSummary: 'Login Feature - Verify user authentication flow',
  loginScenarioDescription: `Test the login functionality of the application.

Acceptance Criteria:
1. User should be able to login with valid credentials
2. User should see appropriate error message for invalid credentials
3. User should be redirected to dashboard after successful login
4. Login session should be maintained across page refreshes
5. User should be able to logout successfully`,
} as const;
