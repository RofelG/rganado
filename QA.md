# Quality Assurance (QA) Policy

This document outlines the quality standards and development workflow for the Portfolio project. The goal is to ensure stability, prevent regressions, and maintain a high standard of code quality through structured testing and controlled deployments.

## Development Workflow

To maintain a stable production environment, all code changes must follow a structured branching strategy.

### 1. Branching Strategy
Direct commits to the `main` branch are prohibited.

- **Main Branch (`main`):** Contains the stable, production-ready version of the application.
- **Feature Branches (`RofelG/feature-name`):** Used for developing new features.
- **Bugfix Branches (`RofelG/fix-name`):** Used for addressing bugs or issues found during development or testing.

### 2. Merging Process
1. **Isolate Changes:** All work must be performed on a dedicated branch.
2. **Local Verification:** Developers must verify the changes locally before initiating any merge.
3. **Pull Requests (PRs):** (Optional/Recommended) Use PRs to review code changes before they are merged into `main`.
4. **Merging:** Once verified, branches should be merged into `main` via controlled operations.

## Testing Requirements

To prevent "rogue commits" from breaking the live site, a robust testing suite must be implemented and expanded as the project grows.

### 1. Unit Testing
Every new feature or significant logic change must be accompanied by unit tests.
- **Objective:** Ensure individual functions and logic blocks work as intended in isolation.
- **Target Areas:** Business logic, data processing, and helper functions.

### 2. Integration Testing
Tests should be written to ensure that different parts of the application (e.g., Express routes, middleware, and React client delivery) work together correctly.
- **Objective:** Validate that the request-response cycle is functioning as expected.
- **Target Areas:** API endpoints, React data fetching, and route handlers.

### 3. Testing Stack
The following tools are used for the testing suite:
- **Test Runner:** `Jest`.
- **HTTP/API Testing:** `Supertest`.
- **Assertion Library:** Jest's built-in matchers.

### 4. Security Reports
GitHub Actions runs third-party security checks on pull requests, pushes to `master`, weekly, and on demand. These scans run against the repository and a locally started portfolio instance; they do not scan the public production domain.

- **Gitleaks:** Detects committed secrets across the full Git history.
- **Trivy:** Reports high and critical dependency and filesystem vulnerabilities in SARIF format.
- **OWASP ZAP baseline:** Passively scans the locally built Express/React application and saves HTML and JSON reports.

Trivy and ZAP reports are available as workflow artifacts; Gitleaks findings are shown in the workflow log and annotations. Trivy findings and ZAP alerts fail the security workflow so they can be reviewed before deployment.

## Quality Gates

Before any code is considered "Done," it must meet the following criteria:
- [ ] **No Regressions:** Existing functionality remains intact (validated by existing tests).
- [ ] **Test Coverage:** New logic is covered by unit/integration tests.
- [ ] **No Breaking Changes:** Changes to the structure (e.g., `package.json`, `server.js`) do not break the build or deployment.
- [ ] **Visual Consistency:** Changes adhere to the rules defined in `DESIGN.md`.

### Automated Pre-commit Hooks

To ensure code quality, a `pre-commit` hook is used to run the unit test suite. 
- **Script Location:** `hooks/pre-commit`
- **Command:** `npm test` (using Jest)

The project uses `git config core.hooksPath hooks` to manage hooks. The hook script is located in the `hooks/pre-commit` directory and is versioned for forensics. If any test fails, the commit is aborted.

## Bug Reporting & Regression
When a bug is identified:
1. Create a `RofelG/fix-...` branch.
2. Write a test case that reproduces the bug.
3. Apply the fix.
4. Ensure the test passes and no existing tests fail.
5. Merge to `main`.
