# Contributing to TMS Automation

This guide covers the conventions and patterns used in the TMS Automation framework. Follow these when adding new features, pages, or tests.

## Project Structure

```
src/
├── api/                  # API client (tms.api.ts, jira.api.ts)
├── config/               # Configuration modules
│   ├── constants.ts      # Barrel re-export (use this import path)
│   ├── timeouts.ts       # TIMEOUTS, RETRY, POLL, CI_CONFIG
│   ├── routes.ts         # ROUTES (app navigation paths)
│   ├── api-paths.ts      # API_PATHS (backend endpoints)
│   ├── test-data.ts      # RANDOM_LENGTH, DATA_DIRS, TEST_DATA
│   ├── jira.ts           # JIRA constants
│   ├── tags.ts           # Tags, Severity, Feature constants
│   └── env.config.ts     # Environment URL mappings
├── fixtures/             # Playwright fixtures
│   ├── tms.fixture.ts    # Main fixture (all page objects + API)
│   ├── api.fixture.ts    # API-only fixture
│   └── api-setup.factory.ts  # Test data setup via API
├── pages/                # Page Object Model
│   ├── base.page.ts      # BasePage (loc, tpl, isVisible)
│   ├── components/       # Reusable UI components
│   └── {feature}/        # Feature-specific page + locators
├── utils/                # Helpers (wait, retry, random, api)
└── setup/                # Auth setup project
tests/
└── {feature}/            # Test specs grouped by feature
```

## Adding a New Page Object (5-step checklist)

1. **Create locators file**: `src/pages/{feature}/{feature}.locators.ts`
   ```typescript
   export const FeatureLocators = {
     someButton: '//button[@data-testid="some-btn"]',
     nameInput: '//input[@placeholder="Name"]',
     itemByName: (name: string) => `//span[text()='${name}']`,
   } as const;
   ```

2. **Create page file**: `src/pages/{feature}/{feature}.page.ts` (extends BasePage)
   ```typescript
   import { type Page, expect, test } from '@playwright/test';
   import { BasePage } from '../base.page.js';
   import { FeatureLocators as L } from './{feature}.locators.js';
   import { TIMEOUTS } from '../../config/constants.js';
   import { waitForNetworkIdle } from '../../utils/wait.helper.js';

   export class FeaturePage extends BasePage {
     constructor(page: Page) { super(page); }

     async doSomething(): Promise<void> {
       await test.step('Do something', async () => {
         await this.loc(L.someButton).click();
         await waitForNetworkIdle(this.page);
       });
     }
   }
   ```

3. **Register fixture** in `src/fixtures/tms.fixture.ts`:
   - Add to `TmsFixtures` type: `featurePage: FeaturePage`
   - Add fixture definition with `use` block

4. **Use `as const`** on the locators export for type safety

5. **Import locators as `L`** alias in the page file (project convention)

## Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Spec files | `{feature}-{scenario}.spec.ts` | `project-crud.spec.ts` |
| Locator files | `{feature}.locators.ts` | `project.locators.ts` |
| Page files | `{feature}.page.ts` | `project.page.ts` |
| Locator exports | `PascalCaseLocators` | `ProjectLocators` |
| Page methods | `verbNoun()` | `createProject()`, `deleteTestCase()` |
| Fixture names | `camelCase` matching page | `projectPage`, `testCasePage` |
| Dynamic locators | Functions returning XPath | `itemByName(name: string) => ...` |

## When to Use What

### Assertions
- **`expect.soft()`** — In page object verification methods (collects all failures without stopping)
- **`expect()`** — Precondition checks and spec-level assertions (fail-fast)

### Test Organization
- **`test.step()`** — Wrap every public page object method for trace readability
- **`test.describe()`** — Group related tests with tags and annotations

### Waiting Patterns
- **`waitForNetworkIdle(page)`** — After clicks, navigation, form submits
- **`locator.waitFor({ state: 'visible' })`** — Before interacting with a specific element
- **`retryAction(page, fn, opts)`** — For actions that may need retry (search, navigation)
- **NEVER use `page.waitForTimeout()`** — Use the patterns above instead. The only exceptions are polling intervals (using `POLL` constants) and animation debounces (using `TIMEOUTS.animation`).

### API vs UI
- **API setup** (`api-setup.factory.ts`) — Create test data via API for speed
- **UI actions** (page objects) — Test the actual user workflows
- **API cleanup** — Always clean up test data in fixture teardown

## Tags and Annotations

Use typed constants from `src/config/tags.ts`:

```typescript
import { Tags, Feature, Severity, feature, severity } from '../../src/config/tags.js';

test.describe('Feature Tests', {
  tag: [Tags.smoke, Tags.regression, Tags.project],
  annotation: [feature(Feature.projectManagement), severity(Severity.critical)],
}, () => { ... });
```

## Running Tests

```bash
# Local (default: stage environment)
npx playwright test

# Specific environment
ENV=eu-stage npx playwright test

# Specific test file
npx playwright test tests/project/project-crud.spec.ts

# With tag filter
npx playwright test --grep @smoke

# Debug mode
npx playwright test --debug
```

## Common Patterns

### BasePage Methods
- `this.loc(selector)` — Create a locator from an XPath string
- `this.tpl(template, ...args)` — Create a locator from a template with interpolation
- `this.isVisible(selector, timeout?)` — Check element visibility (returns boolean)

### Test Data
- Use `randomString()` from `utils/random.helper.js` for unique names
- Use `RANDOM_LENGTH` constants for consistent string lengths
- Prefix test data with context: `AutoProject_`, `TestRun_`, `Dataset_`
