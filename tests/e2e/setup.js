const { test, expect } = require('@playwright/test');
const mainPage = require('../../page-objects/e2e-main-page.js');
const { getCredentialsFromCookies } = require('../../utils/log-in.js');

test.describe('Setup Para Bank test data', () => {
    let credentials;

    test.beforeEach(async ({ context, }) => {
        credentials = await getCredentialsFromCookies(context);
    });

    test('POST /user - create new user.', async ({ context }) => {
        console.log('\ncredentials in setup.js:', credentials);
        // const createUserResponse = await context.request.post(
        //     `${mainPage.baseUrl}/users`,
        //     {
        //         params: {
        //             parameter_one: 'username',
        //             parameter_two: 'password'
        //         },
        //         headers: {
        //             'x-api-key': 'reqres-free-v1'
        //         },
        //         data: {
        //             'email': 'eve.holt@reqres.in',
        //             'password': 'cityslicka'
        //         }
        //     }
        // );
        // const createUserResponseBody = JSON.parse(await createUserResponse.text());
    
        // expect(createUserResponse.status()).toBe(200);
        // expect(createUserResponseBody.token).toBeTruthy();
    });

});
