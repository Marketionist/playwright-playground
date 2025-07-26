let mainPage = {

    env: process.env.ENV,
    login: process.env.LOGIN,
    password: process.env.PASSWORD,
    baseUrl: 'https://parabank.parasoft.com/parabank',
    inputUsername: '#loginPanel [name="username"]',
    inputPassword: '#loginPanel [name="password"]',
    buttonLogIn: '#loginPanel [value="Log In"]',
    blockWelcome: '#leftPanel .smallText',
    blockError: '#rightPanel .error',
    // Create new user
    inputCustomerFirstName: '[id="customer.firstName"]',
    inputCustomerLastName: '[id="customer.lastName"]',
    inputCustomerAddress: '[id="customer.address.street"]',
    inputCustomerCity: '[id="customer.address.city"]',
    inputCustomerState: '[id="customer.address.state"]',
    inputCustomerZipCode: '[id="customer.address.zipCode"]',
    inputCustomerPhoneNumber: '[id="customer.phoneNumber"]',
    inputCustomerSsn: '[id="customer.ssn"]',
    inputCustomerUsername: '[id="customer.username"]',
    inputCustomerPassword: '[id="customer.password"]',
    inputCustomerRepeatedPassword: '[id="repeatedPassword"]',
    buttonRegister: '#customerForm [value="Register"]',
    // Accounts Overview
    tableAccountsOverview: '#accountTable',
    // Transfer Funds
    inputAmount: '#amount',
    buttonTransfer: '.button[value="Transfer"]',
    titleResult: '#showResult .title',
    // Update this placeholder internal function to whatever you need
    _createTestElementSelector: function (text) {
        return '//*[ancestor::*[contains(@class, "test-class")] and ' +
            `descendant::*[contains(text(), "${text}")]] and @type="checkbox"]`;
    },
    // Update this placeholder function to whatever you need
    createTest: async function (text) {
        console.log('Test:', text);
    },

};

module.exports = mainPage;
