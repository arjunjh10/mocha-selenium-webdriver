import { WebdriverWrapper } from '../support/webDriverWrapper';
import { ByHash, WebDriver } from 'selenium-webdriver';
export class ConfluenceHomePage extends WebdriverWrapper {
    confluenceSpaceTitle: ByHash = { xpath: '//h1[@data-test-id="title-text"]' };
    pageTree: ByHash = { xpath: '//div[@data-testid="pageTree"]' };
    spaceTilesContainer: ByHash = { xpath: '//div[@data-testid="space-tiles-container"]' };
    appNavigationHomeLogo: ByHash = {xpath: '//div[@data-testid="app-navigation-home-logo"]'};

    constructor(driver: WebDriver) {
        super(driver);
    }

    goToSpaceFromTheDashboard = async (spaceName: string) => {
        const userSpaceLink: ByHash = { xpath: `//div[@data-testid="space-tiles-container"]//a//p[contains(text(),"${spaceName}")]//parent::a` };
        await this.waitUntilElementLoadedAndDisplayed(this.spaceTilesContainer);
        await this.click(userSpaceLink);
        await this.waitUntilElementLoadedAndDisplayed(this.confluenceSpaceTitle);
        await this.waitUntilElementLoadedAndDisplayed(this.pageTree);
    }
}