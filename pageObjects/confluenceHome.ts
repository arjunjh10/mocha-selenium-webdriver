import { WebdriverWrapper } from '../support/webDriverWrapper';
import { ByHash, WebDriver } from 'selenium-webdriver';
import { LocatorStrategy } from '../support/locators';
const locatorStrategy = new LocatorStrategy();
export class ConfluenceHomePage extends WebdriverWrapper {
    confluenceSpaceTitle = locatorStrategy.generateLocatorFortitle('title-text');
    pageTree = locatorStrategy.generateLocatorForDiv('pageTree');
    spaceTilesContainer = locatorStrategy.generateLocatorForDiv('space-tiles-container');
    appNavigationHomeLogo = locatorStrategy.generateLocatorForDiv('app-navigation-home-logo');

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