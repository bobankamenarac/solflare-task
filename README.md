# solflare-task

Automated UI testing project using WebdriverIO. API tests can be managed with Postman.

---

## Table of Contents

1. [Setup](#setup)
2. [Installation](#installation)
3. [Running Tests](#running-tests)
4. [Test Results](#test-results)
5. [Test Logs](#test-logs)
6. [Project Structure](#project-structure)
7. [Api Tests][$api-tests]

---

## 1. Setup

Clone the repository:
```sh
git clone <repository-url>
cd solflare-task
```

---

## 2. Installation

Install all dependencies:
```sh
npm install
```

---

## 3. Running Tests

To run tests in Chrome (default):
```sh
npm run wdio
```

To run tests in a different browser, set the `BROWSER` environment variable:

**PowerShell:**
```sh
$env:BROWSER="firefox"; npm run wdio
```

**Command Prompt:**
```sh
set BROWSER=firefox&& npm run wdio
```

**Mac/Linux (sh/bash/zsh):**
```sh
BROWSER=firefox npm run wdio
```

---

## 4. Test Results

Test results are generated in the `allure-results` folder.

To generate and open the Allure report:

**PowerShell:**
```sh
npx allure generate allure-results --clean; allure open
```

**Command Prompt:**
```sh
npx allure generate allure-results --clean && allure open
```

**Mac/Linux (sh/bash/zsh):**
```sh
npx allure generate allure-results --clean && allure open
```

---

## 5. Test Logs

Test logs are saved in the `test.log` file. Open this file to review logs from the test run.

---

## 6. Project Structure

```
.gitignore
logger.ts
package.json
README.md
test.log
tsconfig.json
wdio.conf.ts
_results/           # Video recordings of test runs
allure-report/      # Allure HTML reports
allure-results/     # Allure raw results
test/               # Test scripts and page objects
```

---

## 7. Api tests

To run api test you will need Postman!!! More to come when I update all scripts!!!

For any questions or issues, please refer to the documentation or open an issue in the repository.