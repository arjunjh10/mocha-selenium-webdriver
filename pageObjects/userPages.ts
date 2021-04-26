import { ByHash } from 'selenium-webdriver';
import { RestrictionOptions } from '../support/constants';
import { WebdriverWrapper } from '../support/webDriverWrapper';
export class UserPage extends WebdriverWrapper {
    confluenceDashBoard: ByHash = { id: 'confluence-ui' };
    pageTitle: ByHash = { xpath: '//h1[@data-test-id="title-text"]' };
    editPageLinkIcon: ByHash = { id: 'editPageLink' };
    restrictionsDialogButton: ByHash = { xpath: '//button[@data-test-id="restrictions.dialog.button"]' };
    restrictionsDialogModal: ByHash = { xpath: '//div[@data-test-id="restrictions-dialog-modal"]' };
    restrictionsDialogModalTitle: ByHash = { xpath: '//div[@role="dialog"]//h1[contains(text(), "Restrictions")]' };
    contentButtons: ByHash = { xpath: '//span[@data-test-id="content-buttons"]' };
    inspectPermissionsButton: ByHash = { xpath: '//button[@data-test-id="inspect-perms-entry-button"]' };
    learnMoreLink: ByHash = { xpath: '//div[@role="dialog"]//footer//a//span[contains(text(),"Learn more")]' };
    restrictionsModalCancelButton: ByHash = { xpath: '//div[@role="dialog"]//footer//button//span[contains(text(), "Cancel")]' };
    restrictionsModalApplyButton: ByHash = { xpath: '//div[@role="dialog"]//footer//button//span[contains(text(), "Apply")]' };
    restrictionsModalContentSelector: ByHash = { xpath: '//div[@data-test-id="restrictions-dialog-modal"]//div[@data-test-id="restrictions-dialog.content-mode-select"]' };
    restrictionsModalContentMenu: ByHash = { xpath: '//div[@data-test-id="restrictions-dialog-modal"]//div[@data-test-id="restrictions-dialog.content-mode-select"]//div[@class=" css-26l3qy-menu"]' }
    anyoneCanViewOrEditOption: ByHash = { xpath: `//div[@data-test-id="restrictions-dialog-modal"]//div[@data-test-id="restrictions-dialog.content-mode-select"]//div[@class=" css-26l3qy-menu"]//div//span[contains(text(), "${RestrictionOptions.anyoneCanViewAndEdit}")]` };
    anyoneCanViewOnlySomeCanEditOption: ByHash = { xpath: `//div[@data-test-id="restrictions-dialog-modal"]//div[@data-test-id="restrictions-dialog.content-mode-select"]//div[@class=" css-26l3qy-menu"]//div//span[contains(text(), "${RestrictionOptions.anyoneCanViewOnlySomeCanEdit}")]` };
    onlySpecificPeopleCanViewAndEditOption: ByHash = { xpath: `//div[@data-test-id="restrictions-dialog-modal"]//div[@data-test-id="restrictions-dialog.content-mode-select"]//div[@class=" css-26l3qy-menu"]//div//span[contains(text(), "${RestrictionOptions.onlySpecificPeopleCanViewOrEdit}")]` };
    restrictionsIconUnlocked: ByHash = { xpath: '//button[@data-test-id="restrictions.dialog.button"]//img[@data-test-id="unlocked-icon"]' };
    restrictionsIconlocked: ByHash = { xpath: '//button[@data-test-id="restrictions.dialog.button"]//img[@data-test-id="locked-icon"]' };
    requestAccessButton: ByHash = {xpath: '//div[@class="wrapper-space-view-page"]//button//span[contains(text(), "Request access")]'};
    userRestrictedFromPageText: ByHash = {xpath: '//div[@class="wrapper-space-view-page"]//span[contains(text(), "You\'ve stumbled on restricted content")]'};

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