import { ByHash } from 'selenium-webdriver';
import { RestrictionOptions } from '../support/constants';
import { LocatorStrategy } from '../support/locators';
import { WebdriverWrapper } from '../support/webDriverWrapper';
const locatorStrategy = new LocatorStrategy();
export class UserPage extends WebdriverWrapper {
    // Locator for Span texts
    userRestrictedFromPageText = locatorStrategy.generateLocatorForSpan("You\'ve stumbled on restricted content");

    //Locators using ids here
    confluenceDashBoard: ByHash = { id: 'confluence-ui' };
    editPageLinkIcon: ByHash = { id: 'editPageLink' };

    // Locators for buttons here
    restrictionsDialogButton = locatorStrategy.generateLocatorForButton('restrictions.dialog.button');
    inspectPermissionsButton = locatorStrategy.generateLocatorForButton('inspect-perms-entry-button');
    restrictionsModalApplyButton = locatorStrategy.generateLocatorForButton("Apply");
    restrictionsModalCancelButton = locatorStrategy.generateLocatorForButton("Cancel");
    requestAccessButton: ByHash = {xpath: '//button//span[contains(text(), "Request access")]'};

    // Locators for various title elements go here.
    pageTitle = locatorStrategy.generateLocatorFortitle('title-text');
    restrictionsDialogModalTitle = locatorStrategy.generateLocatorFortitle('Restrictions');

    // Locators for various spans
    contentButtons = locatorStrategy.generateLocatorForSpan('content-buttons');
    learnMoreLink = locatorStrategy.generateLocatorForDialogFooterLinks('Learn more');
    
    restrictionsIconUnlocked = locatorStrategy.generateLocatorForImageIcon('unlocked-icon');
    restrictionsIconlocked = locatorStrategy.generateLocatorForImageIcon('locked-icon');

    // Locators for Divs and other div related, nested or dynamic elements.
    restrictionsDialogModal = locatorStrategy.generateLocatorForDiv('restrictions-dialog-modal');
    restrictionsModalContentSelector = locatorStrategy.generateLocatorForDiv('restrictions-dialog.content-mode-select');
    restrictionsModalContentMenu: ByHash = { xpath: '//div[@data-test-id="restrictions-dialog.content-mode-select"]//div[@class=" css-26l3qy-menu"]' }
    anyoneCanViewOrEditOption: ByHash = { xpath: `//div[@data-test-id="restrictions-dialog.content-mode-select"]//div[@class=" css-26l3qy-menu"]//div//span[contains(text(), "${RestrictionOptions.anyoneCanViewAndEdit}")]` };
    anyoneCanViewOnlySomeCanEditOption: ByHash = { xpath: `//div[@data-test-id="restrictions-dialog.content-mode-select"]//div[@class=" css-26l3qy-menu"]//div//span[contains(text(), "${RestrictionOptions.anyoneCanViewOnlySomeCanEdit}")]` };
    onlySpecificPeopleCanViewAndEditOption: ByHash = { xpath: `//div[@data-test-id="restrictions-dialog.content-mode-select"]//div[@class=" css-26l3qy-menu"]//div//span[contains(text(), "${RestrictionOptions.onlySpecificPeopleCanViewOrEdit}")]` };

    goToPage = async (pageName) => {
        const pageElement: ByHash = {xpath: `//div[@data-test-id="page-tree-item"]//a//div//span[contains(text(),"${pageName}")]`};
        await this.waitUntilElementLoadedAndDisplayed(pageElement);
        await this.click(pageElement);
        await this.waitUntilPageElementsLoadedAndDisplayed([this.pageTitle, this.contentButtons]);
    }

    openRestrictionsDialogModal = async () => {
        await this.click(this.restrictionsDialogButton);
        await this.waitUntilElementLoadedAndDisplayed(this.restrictionsDialogModal);
    }

    closeRestrictionsDialogModal = async () => {
        await this.click(this.restrictionsModalCancelButton);
        await this.waitForElementInVisible(this.restrictionsDialogModal);
    }

    resetPageRestrictionsToNone = async () => {
        await this.openRestrictionsDialogModal();
        await this.click(this.restrictionsModalContentSelector);
        await this.waitUntilElementLoadedAndDisplayed(this.restrictionsModalContentMenu);
        await this.click(this.anyoneCanViewOrEditOption);
        await this.waitForElementEnabled(this.restrictionsModalApplyButton);
        await this.click(this.restrictionsModalApplyButton);
        await this.waitForElementInVisible(this.restrictionsDialogModalTitle);
    }

    editPageRestrictionsWithOption = async (optionName: RestrictionOptions) => {
        let option;
        switch (optionName) {
            case RestrictionOptions.anyoneCanViewAndEdit:
                option = this.anyoneCanViewOrEditOption;
                break;

            case RestrictionOptions.anyoneCanViewOnlySomeCanEdit:
                option = this.anyoneCanViewOnlySomeCanEditOption;
                break;

            case RestrictionOptions.onlySpecificPeopleCanViewOrEdit:
                option = this.onlySpecificPeopleCanViewAndEditOption;
                break;

        }
        await this.click(this.restrictionsModalContentSelector);
        await this.waitUntilElementLoadedAndDisplayed(this.restrictionsModalContentMenu);
        await this.click(option);
        await this.waitForElementEnabled(this.restrictionsModalApplyButton);
        await this.click(this.restrictionsModalApplyButton);
        await this.waitForElementInVisible(this.restrictionsDialogModalTitle);
    }

}