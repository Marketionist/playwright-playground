const { defineConfig, devices, } = require('@playwright/test');

const config = {
    /* Timeout is shared between all tests */
    timeout: 60000,
    retries: 0,
    testDir: 'tests/api',
    testMatch: /.*(?<!fast|long)-api-spec\.js/,
    /* Use list and dot reporters while running on CI and only list locally */
    reporter: process.env.CI ? [['list',], ['dot',],] : 'list',
    use: {
        ...devices['Desktop Firefox'],
        headless: true,
        viewport: { width: 1280, height: 720, },
        actionTimeout: 20000,
        ignoreHTTPSErrors: true,
        video: 'off',
        screenshot: 'off',
    },
    projects: [
        {
            name: 'ReqRes',
            testMatch: /.*(?<!fast|long)-api-spec\.js/,
            retries: 0,
        },
        /* Test suites */
        {
            name: 'Fast',
            testMatch: /.*fast-api-spec.js/,
            retries: 1,
        },
        {
            name: 'Long',
            testIgnore: /.*long-api-spec.js/,
            retries: 2,
        },
    ],
};

module.exports = defineConfig(config);
