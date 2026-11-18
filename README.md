# Playwright TypeScript API Testing Framework

A portfolio project for demonstrating API test automation with [Playwright](https://playwright.dev/) and TypeScript. The framework is structured around reusable API services, shared request infrastructure, configuration, and automated test reporting.

## Project Goals

- Demonstrate API testing using Playwright's request context
- Separate HTTP operations from test scenarios
- Support public and third-party API testing
- Provide a maintainable, TypeScript-based test structure
- Run tests consistently in local and CI environments

## APIs in the Framework

The project is organized to cover multiple API providers:

| API | Planned coverage |
| --- | --- |
| [DummyJSON](https://dummyjson.com/) | Products, users, authentication, and search |
| [PokeAPI](https://pokeapi.co/) | Pokémon resources and response validation |
| [Restful-Booker](https://restful-booker.herokuapp.com/) | Create, list, retrieve by ID, update, partially update, and delete bookings; validate the create response against a JSON Schema |

> The API service modules and test suite are currently being implemented.

## Planned Test Coverage

- HTTP status code validation
- Response body and field assertions
- JSON response schema validation
- Authentication and authorization flows
- YAML-based data-driven tests
- Request and response headers
- Query parameters and payload validation
- Parallel test execution

## Technology Stack

- **TypeScript** - strongly typed test and service code
- **Playwright Test** - API request context, assertions, reporting, and test runner
- **Node.js** - runtime environment
- **npm** - dependency and package management
- **GitHub Actions** - continuous integration

## Project Structure

```text
playwright-ts-api-framework/
├── .github/
│   └── workflows/
│       └── playwright.yml       # CI test workflow
├── config/
│   └── config.ts                # Environment and API configuration
├── src/
│   ├── apis/
│   │   ├── DummyJSON.ts         # DummyJSON service methods
│   │   ├── PokeAPI.ts           # PokeAPI service methods
│   │   └── RestfulBooker.ts     # Restful-Booker service methods
│   └── core/
│       └── BaseAPIs.ts          # Shared API request functionality
├── tests/                       # Playwright API test specifications
├── playwright.config.ts         # Playwright runner configuration
├── package.json
└── package-lock.json
```

## Prerequisites

- Node.js 20 or later
- npm
- A Git client

Verify Node.js and npm:

```bash
node --version
npm --version
```

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd playwright-ts-api-framework
```

Install dependencies:

```bash
npm ci
```

Install the Playwright browser dependencies:

```bash
npx playwright install --with-deps
```

Browser binaries are installed for local and CI execution. API-only tests do not require a browser, but the Playwright browser setup is included for future full-stack scenarios.

## Running Tests

Run the complete Playwright test suite:

```bash
npx playwright test
```

Run tests in Playwright UI mode:

```bash
npx playwright test --ui
```

Run a specific test file:

```bash
npx playwright test tests/<test-file>.spec.ts
```

Run tests using a specific project:

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Test Reports

The HTML report is generated after a test run:

```bash
npx playwright show-report
```

Generated reports and artifacts are excluded from source control. In GitHub Actions, the report is uploaded as a workflow artifact.

## Playwright Configuration

The base configuration includes:

- Test discovery from `./tests`
- Fully parallel test execution
- CI-only retries and single-worker mode
- Browser projects for Chromium, Firefox, and WebKit
- HTML reporting
- Trace collection when a test is retried
- `forbidOnly` enabled in CI

## Continuous Integration

The GitHub Actions workflow runs on pushes and pull requests targeting `main` or `master`.

Each workflow run:

1. Checks out the repository
2. Sets up the LTS Node.js version
3. Installs dependencies with `npm ci`
4. Installs Playwright browser dependencies
5. Executes `npx playwright test`
6. Uploads the Playwright report for 30 days

## Design Approach

The framework is designed to keep tests maintainable:

- **Service objects** represent one API provider and expose domain operations
- **Base request helpers** centralize shared HTTP behavior
- **Configuration** keeps environment-specific values outside test logic
- **Test specifications** describe expected API behavior rather than low-level setup
- **Playwright assertions** verify status, headers, values, and response structures

## Roadmap

- [ ] Implement reusable request methods in `BaseAPIs`
- [ ] Add DummyJSON API test scenarios
- [ ] Add PokeAPI test scenarios
- [ ] Add Restful-Booker authentication and CRUD scenarios
- [ ] Add JSON schema validation
- [ ] Add environment-based configuration
- [ ] Add positive and negative test data
- [ ] Add test tags and suite-level scripts
- [ ] Publish and document test run results

## Author

**Visanu Sanyalak**

This project is developed as a QA/API automation portfolio to demonstrate Playwright, TypeScript, framework design, and CI/CD skills.