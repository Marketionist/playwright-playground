const { test, expect } = require('@playwright/test');
const mainPage = require('../../page-objects/e2e-main-page.js');
const { getCredentialsFromCookies } = require('../../utils/log-in.js');

test.describe.parallel('Account Overview', () => {
    let credentials;

    test.beforeEach(async ({ page, context }) => {
        credentials = await getCredentialsFromCookies(context);
        await page.goto(`${mainPage.baseUrl}/overview.htm`);
    });

    test('Verify Accounts Overview table.', async ({ page }) => {
        await expect(page.locator(mainPage.tableAccountsOverview)).toBeVisible();
    });

});
