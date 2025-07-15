# playwright-playground
Playwright playground with some useful code examples:
- [API tests](https://github.com/Marketionist/playwright-playground/blob/main/tests/api/reqres-api-spec.js)
- [End-to-end (e2e) tests](https://github.com/Marketionist/playwright-playground/blob/main/tests/e2e/account-overview-e2e-spec.js)
- [Visual regression tests](https://github.com/Marketionist/playwright-playground/blob/main/tests/visual/playwright-visual-spec.js)

## Supported versions
<a href="https://nodejs.org/en/" rel="nofollow" target="_blank">Node.js</a> >= 14.17.x,
<a href="https://github.com/microsoft/playwright" rel="nofollow" target="_blank">Playwright</a> >= 1.25.1

## Installation
1. Clone this repo:
```bash
git clone git@github.com:Marketionist/playwright-playground.git && cd playwright-playground
```

2. Install dependencies and download browsers:
```bash
npm run install:test-dependencies
```
OR if you have an older OS:
```bash
npm run install:test-dependencies-old
```

## Running tests
- To launch API tests run:
    ```bash
    npm run test:api:reqres
    ```

- To launch end-to-end tests run:
    ```bash
    npm run test:e2e:para-bank
    ```

    > Note: you can run tests with Firefox: `npm run test:e2e:firefox`,
    > Chrome `npm run test:e2e:chrome` or Safari: `npm run test:e2e:webkit`

- To launch visual regression tests run:
    ```bash
    npm run test:visual:playwright
    ```

    > Note: you can update baseline images by running:
    > `npm run test:visual:playwright:update`

## Thanks
If this code examples were helpful to you - please give this repo a **★ Star**
on [GitHub](https://github.com/Marketionist/playwright-playground).
