let mainPage = {

    env: process.env.ENV,
    login: process.env.LOGIN,
    password: process.env.PASSWORD,
    baseUrl: 'https://parabank.parasoft.com/parabank',
    tableAccountsOverview: '#accountTable',
    // Update this placeholder selector to whatever you need
    inputTest: '#test',
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
