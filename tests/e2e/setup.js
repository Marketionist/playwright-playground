const { test, expect } = require('@playwright/test');
const mainPage = require('../../page-objects/e2e-main-page.js');
const { getCredentialsFromCookies } = require('../../utils/log-in.js');

test.describe('Setup Para Bank test data', () => {
    let credentials;

    test.beforeEach(async ({ context, }) => {
        credentials = await getCredentialsFromCookies(context);
    });

    test('POST /createAccount - create new SAVINGS account.', async ({ context }) => {
        console.log('\ncredentials in setup.js:', credentials);

        // Get accountId
        const getAccountOverviewResponse = await context.request.get(
            `${mainPage.baseUrl}/overview.htm`,
            {
                // params: {
                //     parameter_one: 'abc',
                //     parameter_two: 'def',
                // },
                // headers: {
                //     accept: 'application/json',
                // },
            }
        );
        const getAccountOverviewResponseBody = await getAccountOverviewResponse.text();

        // console.log('\ngetAccountOverviewResponse:', getAccountOverviewResponse);
        // console.log('\ngetAccountOverviewResponseBody:', getAccountOverviewResponseBody);

        // Parse customerId from response body string: "services_proxy/bank/customers/" + 19205 + "/accounts"
        // // Getting customerId with 2 splits
        // const customerId = getAccountOverviewResponseBody
        //     .split('"services_proxy/bank/customers/" + ')[1]
        //     .split(' + "/accounts"')[0];
        // Getting customerId with match and replace
        const customerId = getAccountOverviewResponseBody
            .match(/"services_proxy\/bank\/customers\/" \+ [0-9]+ \+ "\/accounts/)[0]
            .replace(/[^0-9]/g, '');

        // console.log('\ncustomerId:', customerId);

        // Get accountId
        const getAccountsResponse = await context.request.get(
            `${mainPage.baseUrl}/services/bank/customers/${customerId}/accounts`,
            {
                params: {
                    customerId: customerId,
                },
                headers: {
                    accept: 'application/json',
                },
            }
        );
        const getAccountsResponseBody = await getAccountsResponse.json();

        // console.log('\ngetAccountsResponse:', getAccountsResponse);
        // console.log('\ngetAccountsResponseBody:', getAccountsResponseBody);

        const accountId = getAccountsResponseBody[0].id;

        const createAccountResponse = await context.request.post(
            `${mainPage.baseUrl}/services/bank/createAccount`,
            {
                params: {
                    customerId: customerId,
                    newAccountType: 1,
                    fromAccountId: accountId,
                },
                headers: {
                    accept: 'application/json',
                },
                // data: {
                //     'request_body_param1': 'test',
                // },
            }
        );
        const createAccountResponseBody = await createAccountResponse.json();

        // console.log('\ncreateAccountResponse:', createAccountResponse);
        // console.log('\ncreateAccountResponseBody:', createAccountResponseBody);

        expect(createAccountResponse.status()).toBe(200);
        expect(createAccountResponseBody.type).toBe('SAVINGS');
    });

});
