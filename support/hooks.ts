const capabilities = require('./capabilities');
const utils = require('./utils');
const addContext = require('mochawesome/addContext');

exports.mochaHooks = {
    async beforeAll() {
        if (process.argv.includes('--headless')) {
            this.driver = utils.createSeleniumDriverSessionHeadless(capabilities.chrome);
        }
        else {
            this.driver = utils.createSeleniumDriverSession(capabilities.chrome);
        }
    },
    async afterEach() {
        if (this.currentTest.state === 'failed') {
            const title = this.currentTest.title.replace(/\s/g, '-');
            const screenshotFileName = `${title}_failed.png`;

            // Storing the screenshot to the folder and the html report
            const screenshotBuffer = await this.driver.takeScreenshot();
            await utils.saveScreenshot(screenshotBuffer, screenshotFileName);
            addContext(this, 'assets/' + screenshotFileName);
        }
    },
    async afterAll() {
        await this.driver.quit();
    }
};
