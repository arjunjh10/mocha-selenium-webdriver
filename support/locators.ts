import { ByHash } from 'selenium-webdriver';

// Intent of this class is to ensure a centralized space for keeping or building element locators for the application.
// This class can potentially be worked on together with the developers to devise more common xpaths or locators used in the application.
export class LocatorStrategy {
    buttonXpath = '//button[@data-test-id="locatorName"] | //button//span[contains(text(), "locatorName")]';
    headingXpath = '//h1[@data-test-id="locatorName"] | //h1[contains(text(), "locatorName")]';
    spanXpath = '//span[@data-test-id="locatorName"] | //span[contains(text(), "locatorName")]';
    divXpath = '//div[@data-test-id="locatorName"] | //div[@data-testid="locatorName"]';
    imageIconXpath = '//img[@data-test-id="locatorName"]';
    dialogFooterXPath = '//div[@role="dialog"]//footer';
    dialogFooterLinksXPath = '//a//span[contains(text(),"locatorName")]';

    generateLocatorForButton = (uniqueIdentifier: string) => {
      const locator: ByHash = { xpath: this.buttonXpath.replace(/locatorName/g, uniqueIdentifier) };
      return locator;
    };

    generateLocatorFortitle = (uniqueIdentifier: string) => {
      const locator: ByHash = { xpath: this.headingXpath.replace(/locatorName/g, uniqueIdentifier) };
      return locator;
    };

    generateLocatorForSpan = (uniqueIdentifier: string) => {
      const locator: ByHash = { xpath: this.spanXpath.replace(/locatorName/g, uniqueIdentifier) };
      return locator;
    };

    generateLocatorForDiv = (uniqueIdentifier: string) => {
      const locator: ByHash = { xpath: this.divXpath.replace(/locatorName/g, uniqueIdentifier) };
      return locator;
    };

    generateLocatorForImageIcon = (uniqueIdentifier: string) => {
      const locator: ByHash = { xpath: this.imageIconXpath.replace(/locatorName/g, uniqueIdentifier) };
      return locator;
    };

    generateLocatorForDialogFooterLinks = (uniqueIdentifier: string) => {
      const path = this.dialogFooterXPath.concat(this.dialogFooterLinksXPath);
      const locator: ByHash = { xpath: path.replace(/locatorName/g, uniqueIdentifier) };
      return locator;
    };
}