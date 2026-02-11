import { RANDOM_LENGTH } from '../config/constants.js';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export function randomString(length: number = RANDOM_LENGTH.standard): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }
  return result;
}

/** Generic prefixed random name: `Prefix_xYzAbC` */
export function randomNamed(prefix: string, length: number = RANDOM_LENGTH.medium): string {
  return `${prefix}_${randomString(length)}`;
}

export function randomEmail(): string {
  return `test_${randomString(RANDOM_LENGTH.medium)}@automation.test`;
}

export function randomProjectName(): string { return randomNamed('AutoProject'); }
export function randomTestCaseName(): string { return randomNamed('AutoTC'); }
export function randomTestRunName(): string { return randomNamed('AutoTR'); }
export function randomBuildName(): string { return randomNamed('AutoBuild'); }
export function randomFolderName(): string { return randomNamed('AutoFolder'); }
export function randomConfigName(): string { return randomNamed('AutoConfig'); }
export function randomMilestoneName(): string { return randomNamed('AutoMilestone'); }
export function randomReportName(): string { return randomNamed('AutoReport'); }
export function randomModuleName(): string { return randomNamed('AutoModule'); }
