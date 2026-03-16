# lumo-playwrite-suite

## What this project is

This repository is a Playwright + TypeScript end-to-end (E2E) automation suite that validates key user-facing flows on **https://www.lumochange.com** (a Wix-hosted marketing site).

The suite focuses on high-value smoke checks:

- Homepage content and key UI elements (hero copy, nav, CTAs, stats)
- Successful navigation to the Contact page

## Tech stack

- **Playwright Test** (`@playwright/test`) for browser automation and assertions
- **TypeScript** for strongly typed tests and Page Objects
- **Allure** (`allure-playwright`) as an additional reporter (results in `allure-results/`)
- **GitHub Actions** for CI execution and artifact upload (HTML report)

## How AI was used to build this

This project was built and stabilized with AI-assisted development using:

- **Windsurf + Cascade** (AI agent inside the IDE)
  - Generated the initial test suite and Page Object Model scaffolding
  - Iterated on selectors to handle Wix DOM patterns (duplicate elements, dynamic rendering)
  - Helped debug strict-mode locator errors and flakiness between UI/headless runs
- **Devin** (AI agent)
  - Contributed to test design thinking and iterative refinement (requirements → assertions → stabilization)

The end result is a maintainable baseline suite that demonstrates how agentic AI can accelerate:

- Creating tests from requirements
- Refactoring into POM
- Debugging flaky selectors
- Getting CI-friendly, repeatable runs

## Project structure (Page Object Model)

- `tests/`
  - `lumo.spec.ts` - end-to-end tests for the Lumo Change site
- `pages/`
  - `lumoHomePage.ts` - homepage locators and navigation helper
  - Additional page objects may exist as the suite grows (e.g. contact/services/careers)

### Pattern

Tests instantiate page objects and use their typed locators:

- Tests stay readable and requirement-focused
- Locators/selectors are centralized in `pages/*`
- Changes to Wix markup usually require updates in one place

## Running tests locally

### Prerequisites

- Node.js (LTS recommended)
- Dependencies installed

### Install

```bash
npm ci
```

### Install browsers

```bash
npx playwright install --with-deps
```

### Run the full suite

```bash
npm test
```

### Run just the Lumo spec in Chromium

```bash
npm run test:chromium -- tests/lumo.spec.ts
```

### Run with the Playwright UI (test harness)

```bash
npm run test:ui
```

### View the HTML report

```bash
npm run report
```

If you see `EADDRINUSE` (port already in use), run on a different port:

```bash
npx playwright show-report --port 9324
```

## Allure reporting

This project is configured to emit Allure results to `allure-results/` (via the Playwright reporter).

To generate and open an Allure HTML report, you need the **Allure CLI** installed on your machine.
Once installed:

```bash
npm run allure:generate
npm run allure:open
```

## CI/CD (GitHub Actions)

Workflow: `.github/workflows/playwright.yml`

On every push / pull request to `main` or `master`, GitHub Actions will:

- Checkout the repo
- Setup Node (LTS)
- Install dependencies (`npm ci`)
- Install Playwright browsers (`npx playwright install --with-deps`)
- Run the test suite (`npx playwright test`)
- Upload the Playwright HTML report as a build artifact (`playwright-report/`)

## Automation release versioning

This repo uses **Semantic Versioning** (SemVer):

- `MAJOR.MINOR.PATCH` (example: `1.2.3`)
- Git tags are prefixed with `v` (example: `v1.2.3`)

### What counts as a release “module”

Use version bumps to reflect discrete automation additions:

- **PATCH**: selector hardening, flake fixes, small assertions
- **MINOR**: new page object, new spec file, new major validation area
- **MAJOR**: breaking changes (suite restructure, renamed APIs, new required env/config)

### Releasing

1. Update `CHANGELOG.md`
2. Bump `package.json` version
3. Create a git tag and push it:

```bash
git tag v1.1.0
git push origin v1.1.0
```

A GitHub Actions workflow (`.github/workflows/release.yml`) will automatically publish a GitHub Release for version tags.
