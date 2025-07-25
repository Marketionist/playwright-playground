const { test, expect } = require('@playwright/test');
const mainPage = require('../../page-objects/e2e-main-page.js');
const { getCredentialsFromCookies } = require('../../utils/log-in.js');

test.describe.parallel('Transfer Funds', () => {
    let credentials;

    test.beforeEach(async ({ page, context }) => {
        credentials = await getCredentialsFromCookies(context);
        await page.goto(`${mainPage.baseUrl}/transfer.htm`);
    });

    test('Verify money transfer.', async ({ page }) => {
        await page.locator(mainPage.inputAmount).fill('100');
        await page.locator(mainPage.buttonTransfer).click();

        // // Wait for 5 seconds
        // await page.waitForTimeout(5000);

        // // Pause for debugging
        // await page.pause();

        await expect(page.locator(mainPage.titleResult)).toBeVisible();
        await expect(page.locator(mainPage.titleResult)).toContainText(
            'Transfer Complete!'
        );
    });

});
