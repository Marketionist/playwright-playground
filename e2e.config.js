const config = {
    timeout: 60000, // Timeout is shared between all tests.
    retries: 0,
    testDir: 'tests/e2e',
    use: {
        headless: true,
        viewport: { width: 1280, height: 720 },
        actionTimeout: 20000,
        ignoreHTTPSErrors: true,
        video: 'retain-on-failure',
        screenshot: 'only-on-failure'
    },
    projects: [
        {
            name: 'Chromium',
            use: { browserName: 'chromium' }
        },
        {
            name: 'Firefox',
            use: { browserName: 'firefox' }
        },
        {
            name: 'Webkit',
            use: { browserName: 'webkit' }
        },
        {
            name: 'Smoke',
            testMatch: /.*smoke.spec.js/,
            retries: 0,
        },
        {
            name: 'Long',
            testIgnore: /.*long.spec.js/,
            retries: 1,
        },
    ],
};

  module.exports = config;