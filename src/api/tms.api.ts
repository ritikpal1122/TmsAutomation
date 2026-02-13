import { APIRequestContext } from '@playwright/test';
import { ApiHelper } from '../utils/api.helper.js';
import { EnvConfig } from '../config/env.config.js';
import { API_PATHS } from '../config/constants.js';
import type {
  TCSummaryInsightsDataRequest,
  TCSummaryInsightsDataResponse,
} from '../types/insights.types.js';
import type {
  ProjectResponse,
  TestCaseResponse,
  TestRunResponse,
  ListResponse,
} from '../types/api-responses.types.js';

export class TmsApi {
  private readonly api: ApiHelper;

  constructor(request: APIRequestContext) {
    this.api = new ApiHelper(request);
  }

  async getTCSummaryInsightsData(
    authToken: string,
    requestBody: TCSummaryInsightsDataRequest,
  ): Promise<{ status: number; body: TCSummaryInsightsDataResponse }> {
    return this.api.postWithAuth<TCSummaryInsightsDataResponse>(
      EnvConfig.tmsInsightsApi,
      requestBody,
      authToken,
    );
  }

  // ============== CRUD HELPERS ==============

  async createProject(
    authToken: string,
    name: string,
    description?: string,
  ): Promise<{ status: number; body: ProjectResponse }> {
    const result = await this.api.postWithAuth<ProjectResponse>(
      `${EnvConfig.tmsApiUrl}${API_PATHS.projects}`,
      { name, description: description ?? '' },
      authToken,
    );
    if (result.status < 200 || result.status >= 300) {
      throw new Error(`Failed to create project "${name}". Status: ${result.status}`);
    }
    return result;
  }

  async deleteProject(
    authToken: string,
    projectId: string,
  ): Promise<{ status: number; body: ProjectResponse }> {
    const result = await this.api.deleteWithAuth<ProjectResponse>(
      `${EnvConfig.tmsApiUrl}${API_PATHS.project(projectId)}`,
      authToken,
    );
    if (result.status < 200 || result.status >= 300) {
      throw new Error(`Failed to delete project "${projectId}". Status: ${result.status}`);
    }
    return result;
  }

  async createTestCase(
    authToken: string,
    projectId: string,
    title: string,
  ): Promise<{ status: number; body: TestCaseResponse }> {
    const result = await this.api.postWithAuth<TestCaseResponse>(
      `${EnvConfig.tmsApiUrl}${API_PATHS.testCases(projectId)}`,
      { title },
      authToken,
    );
    if (result.status < 200 || result.status >= 300) {
      throw new Error(`Failed to create test case "${title}". Status: ${result.status}`);
    }
    return result;
  }

  async createTestRun(
    authToken: string,
    projectId: string,
    name: string,
    testCaseIds?: string[],
  ): Promise<{ status: number; body: TestRunResponse }> {
    const result = await this.api.postWithAuth<TestRunResponse>(
      `${EnvConfig.tmsApiUrl}${API_PATHS.testRuns(projectId)}`,
      { name, test_case_ids: testCaseIds ?? [] },
      authToken,
    );
    if (result.status < 200 || result.status >= 300) {
      throw new Error(`Failed to create test run "${name}". Status: ${result.status}`);
    }
    return result;
  }

  // ============== GET / LIST / UPDATE ==============

  async getProject(
    authToken: string,
    projectId: string,
  ): Promise<{ status: number; body: ProjectResponse }> {
    return this.api.getWithAuth<ProjectResponse>(
      `${EnvConfig.tmsApiUrl}${API_PATHS.project(projectId)}`,
      authToken,
    );
  }

  async listProjects(
    authToken: string,
  ): Promise<{ status: number; body: ListResponse<ProjectResponse> }> {
    return this.api.getWithAuth<ListResponse<ProjectResponse>>(
      `${EnvConfig.tmsApiUrl}${API_PATHS.projects}`,
      authToken,
    );
  }

  async updateProject(
    authToken: string,
    projectId: string,
    data: Partial<Pick<ProjectResponse, 'name' | 'description'>>,
  ): Promise<{ status: number; body: ProjectResponse }> {
    return this.api.patchWithAuth<ProjectResponse>(
      `${EnvConfig.tmsApiUrl}${API_PATHS.project(projectId)}`,
      data,
      authToken,
    );
  }

  async getTestCase(
    authToken: string,
    projectId: string,
    testCaseId: string,
  ): Promise<{ status: number; body: TestCaseResponse }> {
    return this.api.getWithAuth<TestCaseResponse>(
      `${EnvConfig.tmsApiUrl}${API_PATHS.testCase(projectId, testCaseId)}`,
      authToken,
    );
  }

  async listTestCases(
    authToken: string,
    projectId: string,
  ): Promise<{ status: number; body: ListResponse<TestCaseResponse> }> {
    return this.api.getWithAuth<ListResponse<TestCaseResponse>>(
      `${EnvConfig.tmsApiUrl}${API_PATHS.testCases(projectId)}`,
      authToken,
    );
  }

  async getTestRun(
    authToken: string,
    projectId: string,
    testRunId: string,
  ): Promise<{ status: number; body: TestRunResponse }> {
    return this.api.getWithAuth<TestRunResponse>(
      `${EnvConfig.tmsApiUrl}${API_PATHS.testRun(projectId, testRunId)}`,
      authToken,
    );
  }

  async listTestRuns(
    authToken: string,
    projectId: string,
  ): Promise<{ status: number; body: ListResponse<TestRunResponse> }> {
    return this.api.getWithAuth<ListResponse<TestRunResponse>>(
      `${EnvConfig.tmsApiUrl}${API_PATHS.testRuns(projectId)}`,
      authToken,
    );
  }
}
