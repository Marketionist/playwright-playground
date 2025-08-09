const { expect, } = require('@playwright/test');

exports.MainPage = class MainPage {

    /**
     * @param {Object} page isolated Page instance, created for each test.
     */
    constructor (page) {
        this.page = page;
        this.pageTitle = page.locator('h1');
    }

    async goTo (url) {
        await this.page.goto(url);
    }

    async verifyPageTitle (url) {
        await this.page.goto(url);
        await expect(this.pageTitle).toBeVisible();
    }

};
