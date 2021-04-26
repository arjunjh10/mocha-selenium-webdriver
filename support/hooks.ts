const capabilities = require('./capabilities');
const utils = require('./utils');
const addContext = require('mochawesome/addContext');

exports.mochaHooks = {
    async beforeAll() {
        this.driver = utils.createSeleniumDriverSession(capabilities.chromeCapabilities);
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
