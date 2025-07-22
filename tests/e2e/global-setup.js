const { test, expect } = require('@playwright/test');
const mainPage = require('../../page-objects/e2e-main-page.js');
const { logIn } = require('../../utils/log-in.js');

test('Log in', async ({ context }) => {
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
