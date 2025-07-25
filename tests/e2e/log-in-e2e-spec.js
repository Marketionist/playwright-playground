const { test, expect, request } = require('@playwright/test');
const { firefox } = require('playwright');
const mainPage = require('../../page-objects/e2e-main-page.js');

test.describe.parallel.only('Log in', () => {
    let browser;
    let browserContext;
    let newPage;

    test.beforeEach(async ({ page }) => {
        // // Use clean non-loggedin context for API requests
        // const apiContext = await request.newContext({
        //     storageState: {
        //         cookies: [],
        //         origins: [],
        //     },
        // });

        // console.log('\nCurrent apiContext storageState:', await apiContext.storageState());

        // const logInResponse = await apiContext.post(
        //     `${mainPage.baseUrl}/index.htm`,
        //     {
        //         maxRedirects: 0,
        //         headers: {
        //             Authorization: `Bearer A1234`,
        //         },
        //         params: {
        //             urlParam1: '',
        //         },
        //         data: {
        //             login: '',
        //             password: '',
        //         },
        //     }
        // );

        // console.log('\nlogInResponse:', logInResponse);

        // Create a new incognito browser context
        browser = await firefox.launch();
        browserContext = await browser.newContext({
            storageState: {
                cookies: [],
                origins: [],
            },
        });
        console.log('\nCurrent browserContext cookies:', await browserContext.cookies());
        console.log('\nCurrent browserContext storageState:', await browserContext.storageState());

        // // Clear cookies and permissions if needed
        // await browserContext.clearCookies();
        // await browserContext.clearPermissions();

        // Create a new page inside browserContext
        newPage = await browserContext.newPage();
        await newPage.goto(`${mainPage.baseUrl}/index.htm`);
    });

    test.afterEach(async ({ page }) => {
        // Dispose of browserContext once it's no longer needed
        await browserContext.close();
        await browser.close();
    });

    test('Log in with valid credentials.', async ({ page }) => {
        await newPage.locator(mainPage.inputUsername).fill(mainPage.login);
        await newPage.locator(mainPage.inputPassword).fill(mainPage.password);
        await newPage.locator(mainPage.buttonLogIn).click();

        await expect(newPage.locator(mainPage.blockWelcome)).toBeVisible();
        await expect(newPage.locator(mainPage.blockWelcome)).toContainText(
            'Welcome'
        );
    });

    test('Log in with invalid credentials.', async ({ page }) => {
        await newPage.locator(mainPage.inputUsername).fill(`wrong${mainPage.login}`);
        await newPage.locator(mainPage.inputPassword).fill(`wrong${mainPage.password}`);
        await newPage.locator(mainPage.buttonLogIn).click();

        await expect(newPage.locator(mainPage.blockWelcome)).not.toBeVisible();
        await expect(newPage.locator(mainPage.blockError)).toContainText(
            'The username and password could not be verified.'
        );
    });

});
