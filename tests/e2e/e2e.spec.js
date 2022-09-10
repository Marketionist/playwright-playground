const { test, expect } = require('@playwright/test');
// With Page Object
const { MainPage } = require('../../page-objects/main-page.js');

test.describe.parallel('End-to-end test examples', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/');
    });

    test('Log in with valid credentials', async ({ page }) => {
        await page.click('#signin_button');
        await page.type('#user_login', 'username');
        await page.type('#user_password', 'password');
        await page.click('text=Sign in');

        // Bypass SSL issue by opening a page again
        await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html');

        const blockAccountSummary = await page.locator('#account_summary_tab');
        await expect(blockAccountSummary).toBeVisible();

        await page.goto('http://zero.webappsecurity.com/logout.html');
        await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html');
    });

    test('Log in with invalid credentials', async ({ page }) => {
        await page.click('#signin_button');
        await page.type('#user_login', 'wronglogin');
        await page.type('#user_password', 'wrongpass');
        await page.click('text=Sign in');


        const errorMessage = await page.locator('.alert-error');
        await expect(errorMessage).toContainText('Login and/or password are wrong');
    });

});
