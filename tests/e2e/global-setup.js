const { test, expect } = require('@playwright/test');
const mainPage = require('../../page-objects/e2e-main-page.js');
const { logIn } = require('../../utils/log-in.js');

test('Create new user.', async ({ page }) => {
    await page.goto(`${mainPage.baseUrl}/register.htm`);
    await page.locator(mainPage.inputCustomerFirstName).fill(mainPage.login);
    await page.locator(mainPage.inputCustomerLastName).fill(mainPage.password);
    await page.locator(mainPage.inputCustomerAddress).fill(mainPage.login);
    await page.locator(mainPage.inputCustomerCity).fill(mainPage.login);
    await page.locator(mainPage.inputCustomerState).fill(mainPage.login);
    await page.locator(mainPage.inputCustomerZipCode).fill(mainPage.login);
    await page.locator(mainPage.inputCustomerPhoneNumber).fill(mainPage.login);
    await page.locator(mainPage.inputCustomerSsn).fill(mainPage.login);
    await page.locator(mainPage.inputCustomerUsername).fill(mainPage.login);
    await page.locator(mainPage.inputCustomerPassword).fill(mainPage.password);
    await page.locator(mainPage.inputCustomerRepeatedPassword).fill(mainPage.password);
    await page.locator(mainPage.buttonRegister).click();

    await expect(page.locator(mainPage.blockWelcome)).toBeVisible();
    await expect(page.locator(mainPage.blockWelcome)).toContainText(
        'Welcome'
    );

});

test('Log in.', async ({ context }) => {
    console.log('\nLogging in to Para Bank...');
    const logInResponse = await logIn(
        context,
        `${mainPage.baseUrl}/login.htm`,
        {
            username: mainPage.login,
            password: mainPage.password
        }
    );

    expect(logInResponse).toBe(200);
    console.log('\nLogged in to Para Bank!');
});
