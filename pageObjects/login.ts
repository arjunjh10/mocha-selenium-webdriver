import { ByHash, WebDriver } from 'selenium-webdriver';
import { Constants, ApplicationPaths } from '../support/constants';
import { decryptPassword } from '../support/utils';
import { WebdriverWrapper } from '../support/webDriverWrapper';
export class LoginPage extends WebdriverWrapper {
    username: ByHash = { id: 'username' };
    password: ByHash = { id: 'password' };
    expanded: ByHash = { css: 'expanded' };
    continueOrSubmitLoginButton: ByHash = { id: 'login-submit' };
    logoutSubmitButton: ByHash = { id: 'logout-submit' };
    spaceSection: ByHash = { xpath: '//div[@data-testid="space-section"]' };
    appNavigationProfile: ByHash = { xpath: '//div[@data-testid="grid-topNav"]//header[@role="banner"]//span[@data-testid="app-navigation-profile"]' };
    appNavigationProfileMenu: ByHash = { xpath: '//div[@data-testid="app-navigation-profile-menu"]' };

    constructor(driver: WebDriver) {
      super(driver);
    }

    loginUser = async (username: string): Promise<void> => {
      await this.setValue(this.username, username);
      await this.waitUntilElementLoadedAndDisplayed(this.continueOrSubmitLoginButton);
      await this.click(this.continueOrSubmitLoginButton);
      await this.waitUntilElementLoadedAndDisplayed(this.password);
      await this.setValue(this.password, decryptPassword(Constants.passwordCipherText));
      await this.click(this.continueOrSubmitLoginButton);
      await this.waitUntilElementLoadedAndDisplayed(this.spaceSection);
    };

    logoutUser = async (): Promise<void> => {
      await this.getUrl(ApplicationPaths.logoutUrl);
      await this.isDocumentReady();
      await this.click(this.logoutSubmitButton);
      await this.waitUntilElementLoadedAndDisplayed(this.username);
    };
}