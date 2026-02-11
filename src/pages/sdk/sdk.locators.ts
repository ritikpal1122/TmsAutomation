import { CommonLocators as C } from '../common/common.locators.js';

/**
 * Locators for SDK functionality in Test Manager
 */

export const SdkLocators = {
  sdkExpand: `//button[span[text()=' Expand details']]`,
  sdkCollapse: `//span[text()='Collapse details']`,
  sdkEndSession: `(//span[text()='End Session'])[3]`,
  sdkNextStepButton: `//button[@aria-label="Next"]`,
  sdkStep1: `//span[text()='1']`,
  sdkStep2: `//span[text()='2']`,
  sdkStep3: `//span[text()='3']`,
  sdkStep4: `//span[text()='4']`,
  sdkStep5: `//span[text()='5']`,
  recordMedia: `//span[text()='Recorded Media']`,
  tcStatusPassedSdk: C.passedSpan,
  statusPassedSdk: `(//span[text()='Passed'])[2]`,
  tcStatusPassedBuildSummSdk: C.passedSpan,
  markSdkStatus: `//span[text()='Mark Status']`,
  finishSdk: `//span[text()='Finish']`,
  tcNextCtaSdk: C.nextSpan,
  remarkSdk: `//textarea[@placeholder='Add any observation/remark for the test case execution.']`,
  projectTagSdk: C.tagsInput,
  openMenuSdk: `//button[@aria-label="open-menu"]`,
  openExpandMenu: `(//button[@data-component='IconButton' and @aria-label='open-menu'])[last()]`,
  collapseToExpand: `//span[text()='Test Step Execution Summary']`,
  manualStep: `//div[@id='step-description']//div[contains(@class, 'reactjs-tiptap-editor')]`,
  tcStatusFailedSdk: `//span[span[text()='Failed']]`,
  testStepsStatusCollapse: (stepName: string) => `(//div[div[div[div[span[text()='${stepName}']]]]]//button)[4]`,
} as const;

/**
 * Dynamic locator functions
 */

/**
 * Returns locator for step display in SDK
 */
export const stepDisplayInSdk = (step: string) =>
  `//span[text()='${step}']`;

/**
 * Returns locator for step display in editor
 */
export const stepDisplayInEditor = (step: string) =>
  `(//div[text()='${step}'])[3]`;
