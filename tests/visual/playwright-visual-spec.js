const { test, expect, } = require('@playwright/test');
// With Page Object
const { MainPage, } = require('../../page-objects/visual-main-page.js');

test.describe('Playwright visual regression', () => {
    test('Full page snapshot.', async ({ page, }) => {
        await page.goto('https://playwright.dev/');

        // See https://github.com/microsoft/playwright/issues/10219#issuecomment-1062120505 and
        // https://playwright.dev/docs/test-assertions#page-assertions-to-have-screenshot-2
        // for all toHaveScreenshot options
        expect(await page.screenshot({ fullPage: true, }))
            .toMatchSnapshot('homepage-full.png');
    });

    test('Full page snapshot (with Page Object).', async ({ page, }) => {
        const mainPage = new MainPage(page);

        await mainPage.goTo('https://playwright.dev');

        expect(await page.screenshot({ fullPage: true, }))
            .toMatchSnapshot('homepage-full.png');
    });

    test('Single element snapshot.', async ({ page, }) => {
        await page.goto('https://playwright.dev');

        const pageTitle = await page.$('h1');

        // See https://playwright.dev/docs/test-assertions#screenshot-assertions-to-match-snapshot-1
        // for all toMatchSnapshot options
        expect(await pageTitle.screenshot()).toMatchSnapshot('homepage-title.png', { maxDiffPixels: 20, });
    });

    test('Single element snapshot (with Page Object).', async ({ page, }) => {
        const mainPage = new MainPage(page);

        await mainPage.verifyPageTitle('https://playwright.dev');

        expect(await mainPage.pageTitle.screenshot()).toMatchSnapshot('homepage-title.png', { maxDiffPixels: 20, });
    });

    test('Text content comparison.', async ({ page, }) => {
        await page.goto('https://playwright.dev');

        expect(await page.textContent('.hero__title')).toMatchSnapshot('homepage-title-text.txt');
    });
});
