const { defineConfig, devices } = require('@playwright/test');

const config = {
    /* Timeout is shared between all tests */
    timeout: 60000,
    retries: 0,
    testDir: 'tests/e2e',
    testMatch: /.*(?<!fast|long)-e2e-spec\.js/,
    /* Use list and dot reporters while running on CI and only list locally */
    reporter: process.env.CI ? [['list',], ['dot',],] : 'list',
    use: {
        ...devices['Desktop Firefox'],
        headless: true,
        viewport: { width: 1280, height: 720 },
        actionTimeout: 20000,
        ignoreHTTPSErrors: true,
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
    },
    projects: [
        {
            name: 'Log in',
            testDir: 'tests/e2e',
            testMatch: /global-setup\.js/,
            retries: 0,
        },
        {
            name: 'Setup test data',
            testDir: 'tests/e2e',
            testMatch: /.*(?<!global-)setup\.js/,
            use: {
                storageState: '.auth/user.json',
            },
            dependencies: ['Log in',],
            retries: 0,
        },
        {
            name: 'Para Bank',
            testDir: 'tests/e2e',
            testMatch: /.*(?<!fast|long)-e2e-spec\.js/,
            use: {
                storageState: '.auth/user.json',
                /* An object containing additional HTTP headers to be sent with every request */
                // extraHTTPHeaders: {
                //     'X-My-Header': 'value',
                // },
            },
            dependencies: ['Setup test data',],
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
            testMatch: /.*fast-e2e-spec.js/,
            retries: 1,
        },
        {
            name: 'Long',
            testIgnore: /.*long-e2e-spec.js/,
            retries: 2,
        },
    ],
};

module.exports = defineConfig(config);
