const authFilePath = 'playwright/.auth/user.json';

async function logIn (context, url, parametersObject) {
    const logInResponse = await context.request.post(
        url,
        {
            params: parametersObject,
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

    // Save credentials into cookie
    await context.addCookies([{
        name: 'ta_credentials',
        value: JSON.stringify(logInResponseBody),
        url: 'https://ta-data.stijit.com',
    }]);

    // Save cookies (context state) to the authFile
    await context.request.storageState({ path: authFilePath, });

    return logInResponse.status();
}
async function getCredentialsFromCookies (context) {
    const storageData = await context.storageState();
    let credentials = {};
    
    credentials.credentials = JSON.parse(storageData.cookies.find((cookie) => {
        return cookie.name === 'ta_credentials';
    }).value);
    credentials.sessionId = storageData.cookies.find((cookie) => {
        return cookie.name === 'JSESSIONID';
    }).value;

    return credentials;
}

module.exports = { logIn, getCredentialsFromCookies };
