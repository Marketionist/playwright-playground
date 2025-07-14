const { test, expect } = require('@playwright/test');
const mainPage = require('../../page-objects/e2e-main-page.js');

const authFilePath = 'playwright/.auth/user.json';

test('Log in', async ({ context }) => {
    console.log('Logging in to Para Bank...');
    const logInResponse = await context.request.post(
        `${mainPage.baseUrl}/login.htm`,
        {
            params: {
                username: mainPage.login,
                password: mainPage.password
            },
            // headers: {
            //     'x-api-key': 'reqres-free-v1'
            // },
            // data: {
            //     'email': 'eve.holt@reqres.in',
            //     'password': 'cityslicka'
            // },
        },
    );
    const logInResponseBody = await logInResponse.text();

    // console.log('\nlogInResponse:', logInResponse);
    // console.log('\nlogInResponseBody:', logInResponseBody);

    expect(logInResponse.status()).toBe(200);

    // Save credentials into cookie
    await context.addCookies([{
        name: 'credentials_para_bank',
        value: JSON.stringify(logInResponseBody),
        url: 'https://ta-data.stijit.com',
    }]);

    // Save cookies (context state) to the authFile
    await context.request.storageState({ path: authFilePath, });

    console.log('Logged in to Para Bank!');
});
