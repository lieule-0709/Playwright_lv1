# playwright

Example of using Playwright with TypeScript

## Table of Contents

- [Project Structure](#project-structure)
- [Project Note](#project-note)
- [Install dependencies](#install-dependencies)
- [Run test](#run-test)
- [View test result](#view-test-result)
- [Lint code](#lint-code)
- [Format code](#format-code)

## Project Structure

- .github: Github workflow actions
- data: Test data is used for test cases
- pages: The Page Object Model
- tests: All test features
- playwright.config.js: Playwright configuration file
- fixtures
  - Fixture files for setting up shared test data and environment
- models: Define data types and data examples

## Project Note

In parallel mode, the AUT is not stable if multiple tests login with the same credentials, so we apply the [Worker-scoped fixture](https://playwright.dev/docs/test-fixtures#worker-scoped-fixtures). If you want to run more four workers, please add more users in the **./data/users.json** file.

## Install dependencies

```sh
npm install && npx playwright install
```

## Run test

- Run all the tests with headed mode

```sh
npx playwright test --headed
```

- Run all the tests against a specific project

```sh
npx playwright test --project="Microsoft Edge"
```

- Run tests with tag

```sh
npx playwright test --grep "@SmokeTest"
```

## View test result

```sh
npx playwright show-report
```

## Lint code

```sh
npx eslint .
```

## Format code

```sh
npx prettier . --write
```

## VS Code extentions

- [Run Playwright Test tests in Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)
- [Prettier code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [JavaScript and TypeScript playground in your editor](https://marketplace.visualstudio.com/items?itemName=WallabyJs.quokka-vscode)
- [Make TypeScript errors prettier and more human-readable in VSCode](https://marketplace.visualstudio.com/items?itemName=yoavbls.pretty-ts-errors)
