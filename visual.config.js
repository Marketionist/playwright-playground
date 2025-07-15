const { defineConfig, devices } = require('@playwright/test');

const config = {
    /* Timeout is shared between all tests */
    timeout: 60000,
    retries: 0,
    testDir: 'tests/visual',
    testMatch: /.*(?<!fast|long)-visual-spec\.js/,
    use: {
        ...devices['Desktop Firefox'],
        headless: true,
        viewport: { width: 1280, height: 720 },
        actionTimeout: 20000,
        ignoreHTTPSErrors: true,
        video: 'off',
        screenshot: 'off'
    },
    projects: [
        {
            name: 'Playwright',
            testMatch: /.*(?<!fast|long)-visual-spec\.js/,
            retries: 0,
        },
        /* Test against desktop browsers */
        {
            name: 'Chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'Firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'Webkit',
            use: { ...devices['Desktop Safari'] },
        },
        /* Test against mobile viewports */
        {
            name: 'Mobile Chrome',
            use: { ...devices['Pixel 5'] },
        },
        {
            name: 'Mobile Safari',
            use: { ...devices['iPhone 12'] },
        },
        /* Test against branded browsers */
        {
            name: 'Google Chrome',
            use: { ...devices['Desktop Chrome'], channel: 'chrome' }, // or 'chrome-beta'
        },
        {
            name: 'Microsoft Edge',
            use: { ...devices['Desktop Edge'], channel: 'msedge' }, // or 'msedge-dev'
        },
        /* Test suites */
        {
            name: 'Fast',
            testMatch: /.*fast-visual-spec.js/,
            retries: 1,
        },
        {
            name: 'Long',
            testIgnore: /.*long-visual-spec.js/,
            retries: 2,
        },
    ],
};

  module.exports = defineConfig(config);
