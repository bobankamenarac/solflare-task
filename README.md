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
7. [Api Tests](#api-tests)
8. [Remarks](#remarks)

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
$env:BROWSER="firefox"
```

**Command Prompt:**
```sh
set BROWSER=firefox
```

**Mac/Linux (sh/bash/zsh):**
```sh
export BROWSER="firefox"
```

After this just run next command:

```sh
npm run wdio
```

---

## 4. Test Results

Test results are generated in the `allure-results` folder.

To generate Allure report run:

```sh
npm run generate-allure
```

To open Allure report run:

```sh
npm run open-allure
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

To run api test you will need Postman. Inside git repository in postman folder there are two postman files:
- solflare-api.postman_collection,
- solflare-api.postman_environments

Open Postman and import them. After that select "Solflare" environment. Then check collection where inside solflare folder there are subfolders for different test scenarious.
First three scenarious can be run by entering every request and sending it.
For forth scenario it must be runned all together, next to folder there are "..." symbol, click on it then run.

## 8. Remarks

Please notice next things:
- For the UI automation task everything is as specified inside task, with small addition of tests that I created in order to play around with WebDriverIO to get feeling about it,
- For API test there is some difference from task, for example when calling api without network task specified that only Solana token is returned, but in reality there is couple more tokens. 
- I notice couple of security issues:
1) Address is still valid even if one character from same is removed,
2) Request can be http instead of https,
3) If http is used, we can send POST, PUT, DELETE request with same data as GET and we would get response with some tokens.

For any questions or issues, please refer to the documentation, open an issue in the repository or contact me on bobankamenarac@gmail.com.