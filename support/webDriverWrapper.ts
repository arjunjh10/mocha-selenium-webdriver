import { Locator, until, WebDriver, WebElementPromise } from 'selenium-webdriver';
import { Constants } from './constants';

export class WebdriverWrapper {
  constructor(private readonly driver: WebDriver) {
  }

    waitUntilElementLoadedAndDisplayed = async (locator: Locator): Promise<WebElementPromise> => {
      const locatorValue = JSON.stringify(locator);
      await this.driver.wait(until.elementLocated(locator), Constants.webdriverTimeOut, `Element not located: ${locatorValue}`);
      await this.driver.wait(until.elementIsVisible(this.driver.findElement(locator)), Constants.webdriverTimeOut,
        `Element not visible: ${locatorValue}`);

      return await this.driver.findElement(locator);
    };

    /* eslint-disable-next-line require-await*/
    waitUntilPageElementsLoadedAndDisplayed = async (locators: Array<Locator>): Promise<WebElementPromise> => {
      const elements = locators.map(async locator => await this.waitUntilElementLoadedAndDisplayed(locator));
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      return (Promise as any).all(elements);
    };

    click = async (locator: Locator) =>
      await this.driver.findElement(locator).click();

    setValue = async (locator: Locator, value: string) =>
      await this.driver.findElement(locator).sendKeys(value);


    findElement = async (locator: Locator): Promise<WebElementPromise> =>
      await this.driver.findElement(locator);

    waitForElementEnabled = async (locator: Locator): Promise<WebElementPromise> =>
      this.driver.wait(until.elementIsEnabled(await this.findElement(locator)),
        Constants.webdriverTimeOut,
        'Element should be enabled');

    getUrl = async (url: string) =>
      await this.driver.get(url);

    isElementDisplayedAndHasText = async (locator: Locator, text: string): Promise<boolean> => {
      const element = await this.findElement(locator);
      const elementText = await element.getText();

      if (await this.isElementDisplayed(locator) && elementText === text) {
        return true;
      } else {
        console.log(`Locator: ${locator} does not contain the text value: ${text}`);
        return false;
      }
    };

    isElementDisplayed = async (locator: Locator): Promise<boolean> =>
      (await this.findElement(locator)).isDisplayed();

    waitForElementInVisible = async (locator: Locator): Promise<boolean> =>
      await this.driver.wait(async () => (await this.driver.findElements(locator)).length === 0, Constants.webdriverTimeOut,
        `Element not invisible: ${JSON.stringify(locator)}`);

    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    executeJavascript = async (script: string | any) =>
      await this.driver.executeScript(script);

    isDocumentReady = async (): Promise<void> => {
      let docReady = false;
      while (!docReady) {
        const documentReadyState = await this.executeJavascript('return document.readyState');
        if (documentReadyState === 'complete') {
          docReady = true;
        }
      }
    };
}