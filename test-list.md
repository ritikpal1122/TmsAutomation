# TMS Playwright Automation — Test Cases (54)

## Project

| # | Test File | Description | Verified |
|---|-----------|-------------|----------|
| 1 | `project/project-crud.spec.ts` | Create, edit, and delete a project with tags and description | - [✅] |

## Test Case

| # | Test File | Description | Verified |
|---|-----------|-------------|----------|
| 2 | `test-case/test-case-create.spec.ts` | Create a test case with type, priority, status, and automation status fields | - [✅ ] |
| 3 | `test-case/test-case-edit.spec.ts` | Edit test case fields, upload attachments, create manual and AI-generated test steps | - [✅ ] |
| 4 | `test-case/test-case-scenarios.spec.ts` | Create test case with scenario type, add multiple scenarios, clone and delete scenarios | - [✅ ] |

## Test Run

| # | Test File | Description | Verified |
|---|-----------|-------------|----------|
| 5 | `test-run/test-run-crud.spec.ts` | Create and delete test runs without configuration or assignee | - [ ✅] |
| 6 | `test-run/test-run-edit.spec.ts` | Edit test run to add new test case and verify both test cases in instances (PT-14238439) | - [ ] |
| 7 | `test-run/test-run-execute.spec.ts` | Execute test run manually, mark step and TC statuses (Passed/Failed/Skipped), verify remark and overall status (PT-14247613) | - [ ] |
| 8 | `test-run/test-run-bulk.spec.ts` | Delete from list (PT-14238429), delete from edit page (PT-14238430), duplicate with auto name (PT-14238438), archive test runs | - [ ] |
| 9 | `test-run/test-run-with-config.spec.ts` | Create test run with configuration but without assignee | - [ ] |
| 10 | `test-run/test-run-with-assignee.spec.ts` | Create test run with config and assignee via wizard flow (PT-14178483) | - [ ] |

## Folder

| # | Test File | Description | Verified |
|---|-----------|-------------|----------|
| 11 | `folder/folder-crud.spec.ts` | Creates, renames, and deletes a folder with subfolder | - [ ] |
| 12 | `folder/folder-drag-drop.spec.ts` | Drags and drops folders to reorder them | - [ ] |
| 13 | `folder/folder-subfolder-crud.spec.ts` | Creates, renames, and deletes folder and subfolder with test cases inside | - [ ] |
| 14 | `folder/copy-move.spec.ts` | Copies and moves test cases between folders within the same project | - [ ] |
| 15 | `folder/copy-move-cross-project.spec.ts` | Copies and moves test cases across different projects | - [ ] |
| 16 | `folder/test-case-selection.spec.ts` | Selects and deselects test cases using checkboxes with select all functionality | - [ ] |

## Configuration

| # | Test File | Description | Verified |
|---|-----------|-------------|----------|
| 17 | `configuration/configuration-crud.spec.ts` | Creates and deletes Windows web browser configuration | - [ ] |
| 18 | `configuration/configuration-macos.spec.ts` | Creates, edits, and deletes macOS configuration with Safari browser | - [ ] |
| 19 | `configuration/configuration-linux.spec.ts` | Creates, edits, and deletes Linux configuration with Firefox browser | - [ ] |
| 20 | `configuration/configuration-mobile-ios.spec.ts` | Creates and deletes iOS mobile configuration with Safari browser | - [ ] |
| 21 | `configuration/configuration-mobile-android.spec.ts` | Creates and deletes Android mobile configuration with Chrome browser | - [ ] |

## Milestone

| # | Test File | Description | Verified |
|---|-----------|-------------|----------|
| 22 | `milestone/milestone-crud.spec.ts` | Full milestone CRUD with test run integration including create, edit, delete, and progress tracking | - [ ] |
| 23 | `milestone/milestone-search-filter.spec.ts` | Search, filter by status (Open/Complete), and mark milestone as completed | - [ ] |
| 24 | `milestone/milestone-testrun.spec.ts` | Create milestone with due date and associate test run via edit with progress verification | - [ ] |

## Report

| # | Test File | Description | Verified |
|---|-----------|-------------|----------|
| 25 | `report/report-date-range.spec.ts` | Create Detailed Execution History report with date range preset filter (Last 30 Days) | - [ ] |
| 26 | `report/report-test-runs.spec.ts` | Create report with test runs filter selection | - [ ] |
| 27 | `report/report-priority-filter.spec.ts` | Create report with priority filter (High) for test cases | - [ ] |
| 28 | `report/report-status-filter.spec.ts` | Create report with status filter (Draft) and verify test case count | - [ ] |
| 29 | `report/report-automation-status-filter.spec.ts` | Create report with automation status filter (Not Automated) and verify test case count | - [ ] |
| 30 | `report/report-type-filter.spec.ts` | Create report with type filter (Functional) and verify test case count | - [ ] |
| 31 | `report/report-folder-filter.spec.ts` | Create report with folder filter for test cases in specific folder | - [ ] |
| 32 | `report/report-priority-status-filter.spec.ts` | Create report with combined priority (High) and status (Draft) filters | - [ ] |
| 33 | `report/report-triple-filter.spec.ts` | Create report with priority, status, and automation status filters combined | - [ ] |
| 34 | `report/report-multiple-filters.spec.ts` | Create report with priority and status filters applied together | - [ ] |
| 35 | `report/report-testrun-multiple-filters.spec.ts` | Create report with test runs filter plus priority and status filters combined | - [ ] |

## CSV Import

| # | Test File | Description | Verified |
|---|-----------|-------------|----------|
| 36 | `csv-import/csv-import.spec.ts` | Verifies CSV import upload and columns validation for test cases | - [ ] |
| 37 | `csv-import/csv-import-scenarios.spec.ts` | Imports BDD CSV file and verifies test case and folder creation | - [ ] |
| 38 | `csv-import/csv-download-sample.spec.ts` | Downloads and verifies sample CSV template file | - [ ] |

## Dataset

| # | Test File | Description | Verified |
|---|-----------|-------------|----------|
| 39 | `dataset/dataset-crud.spec.ts` | Full dataset CRUD lifecycle including create, search, edit, add rows, and delete | - [ ] |

## Build

| # | Test File | Description | Verified |
|---|-----------|-------------|----------|
| 40 | `build/build-crud.spec.ts` | Creates, edits, duplicates, and verifies build within test run | - [ ] |

## Module

| # | Test File | Description | Verified |
|---|-----------|-------------|----------|
| 41 | `module/module-crud.spec.ts` | Creates reusable module with steps and inserts it into test case | - [ ] |

## Insights

| # | Test File | Description | Verified |
|---|-----------|-------------|----------|
| 42 | `insights/insights-validation.spec.ts` | Validates insights dashboard metrics, labels, charts, and automation coverage | - [ ] |
| 43 | `insights/insights-mixed-status.spec.ts` | Verifies insights with different test instance statuses (Passed/Failed/Skipped) and test case types | - [ ] |
| 44 | `insights/insights-date-range.spec.ts` | Validates insights date range filter functionality and data refresh with custom date ranges | - [ ] |

## Settings

| # | Test File | Description | Verified |
|---|-----------|-------------|----------|
| 45 | `settings/system-fields.spec.ts` | Adds values to system fields (Priority, Status, Type) and verifies in test case | - [ ] |
| 46 | `settings/custom-fields.spec.ts` | Creates custom fields of various types (string, textarea, number, boolean, date, dropdown, URL) | - [ ] |
| 47 | `settings/custom-fields-parameterized.spec.ts` | Data-driven test creating all custom field types from parameterized data array | - [ ] |

## SDK

| # | Test File | Description | Verified |
|---|-----------|-------------|----------|
| 48 | `sdk/sdk-run.spec.ts` | Executes test steps via SDK, marks status, adds remarks, and finishes execution | - [ ] |

## Automation

| # | Test File | Description | Verified |
|---|-----------|-------------|----------|
| 49 | `automation/automation-link-tc.spec.ts` | Links and unlinks test case from automation dashboard | - [ ] |

## KaneAI

| # | Test File | Description | Verified |
|---|-----------|-------------|----------|
| 50 | `kaneai/kaneai-automate.spec.ts` | Automates test case using KaneAI with desktop browser selection and approval flow | - [ ] |

## Jira Integration

| # | Test File | Description | Verified |
|---|-----------|-------------|----------|
| 51 | `jira-integration/jira-testmu-ai.spec.ts` | Creates Jira issue, triggers TestMu AI comment, and verifies AI-generated test cases response | - [ ] |

## API

| # | Test File | Description | Verified |
|---|-----------|-------------|----------|
| 52 | `api/projects.api.spec.ts` | API tests for project CRUD operations (create, list, get, update, delete) with validation | - [ ] |
| 53 | `api/test-cases.api.spec.ts` | API tests for test case CRUD operations under projects with validation | - [ ] |
| 54 | `api/test-runs.api.spec.ts` | API tests for test run CRUD operations with test case associations and validation | - [ ] |
