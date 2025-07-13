const { defineConfig, devices } = require('@playwright/test');

const config = {
    timeout: 60000, // Timeout is shared between all tests.
    retries: 0,
    testDir: 'tests/visual',
    use: {
        headless: true,
        viewport: { width: 1280, height: 720 },
        actionTimeout: 20000,
        ignoreHTTPSErrors: true,
        video: 'off',
        screenshot: 'off'
    },
    projects: [
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
        {
            name: 'Smoke',
            testMatch: /.*smoke.spec.js/,
            retries: 0,
        },
        {
            name: 'Long',
            testIgnore: /.*long.spec.js/,
            retries: 2,
        },
    ],
};

  module.exports = defineConfig(config);
