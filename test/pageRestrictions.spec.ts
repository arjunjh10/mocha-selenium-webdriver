/* eslint-disable require-await */
import { LoginPage } from '../pageObjects/login';
import { WebElement } from 'selenium-webdriver';
import { Constants, ApplicationPaths, RestrictionOptions } from '../support/constants';
import { ConfluenceHomePage } from '../pageObjects/confluenceHome';
import { UserPage } from '../pageObjects/userPages';
import { expect } from 'chai';

describe('Page Restrictions Feature', function () {
  let loginPage: LoginPage;
  let confluenceHome: ConfluenceHomePage;
  let userPage: UserPage;

  before(async function () {
    await this.driver.get(ApplicationPaths.baseUrl);
    loginPage = new LoginPage(this.driver);
    confluenceHome = new ConfluenceHomePage(this.driver);
    userPage = new UserPage(this.driver);

  });

  context('General Modal Validations', function () {
    before(async function () {
    // Pre-requisite, login the correct user and go to the page within their personal space
      await loginPage.loginUser(Constants.user2);
      await confluenceHome.isDocumentReady();
      await confluenceHome.goToSpaceFromTheDashboard(Constants.user2TestSpaceName);
      await userPage.isDocumentReady();
      await userPage.goToPage(Constants.testSamplePageName);
      await userPage.openRestrictionsDialogModal();
    });

    after(async function () {
      await userPage.closeRestrictionsDialogModal();
    });

    it('should display the retrictions modal', async function () {
      expect(await userPage.isElementDisplayedAndHasText(userPage.restrictionsDialogModalTitle, 'Restrictions')).to.equal(true);
    });

    it('should have the permissions link', async function () {
      expect(await userPage.isElementDisplayedAndHasText(userPage.inspectPermissionsButton, 'Inspect permissions')).to.equal(true);
    });

    it('should contain the learn more link, the cancel and apply action buttons', async function () {
      expect(await userPage.isElementDisplayedAndHasText(userPage.learnMoreLink, 'Learn more')).to.equal(true);
      expect(await userPage.isElementDisplayedAndHasText(userPage.restrictionsModalCancelButton, 'Cancel')).to.equal(true);
      expect(await userPage.isElementDisplayedAndHasText(userPage.restrictionsModalApplyButton, 'Apply')).to.equal(true);
    });
  });


  context('Update restrictions to allow only specific users to view or edit', async function () {
    let unlockedIcon: WebElement;
    before(async function () {
      // ensure the unlocked icon is present on the dom else fail the assertion.
      unlockedIcon = await userPage.findElement(userPage.restrictionsIconUnlocked);
      expect(await unlockedIcon.isDisplayed()).to.equal(true);
      await userPage.openRestrictionsDialogModal();
    });

    after(async function () {
      // Reset page restrictions for future runs
      await userPage.resetPageRestrictionsToNone();
      unlockedIcon = await userPage.findElement(userPage.restrictionsIconUnlocked);
      expect(await unlockedIcon.isDisplayed()).to.equal(true);
      // Logout the currently logged in user before we continue
      await loginPage.logoutUser();
    });

    it('should apply restrictions such that only specific people can view or edit', async function () {
      expect(await userPage.isElementDisplayed(userPage.restrictionsModalContentSelector)).to.equal(true);

      await userPage.editPageRestrictionsWithOption(RestrictionOptions.onlySpecificPeopleCanViewOrEdit);
      expect(await userPage.isElementDisplayed(userPage.restrictionsIconlocked)).to.equal(true);

      // We'll check if the unlocked icon is present on the dom, if not, we assert that the error is of the type we want
      userPage.findElement(userPage.restrictionsIconUnlocked).catch(error => {
        expect(error.name).to.equal('NoSuchElementError');
      });
    });
  });

  context('User with no permissions attempts to access or edit a restricted page directly', async function () {
    before(async function () {
      await loginPage.loginUser(Constants.user1);
      await this.driver.get(ApplicationPaths.samplePageUser2);
      await userPage.isDocumentReady();
      await confluenceHome.waitUntilPageElementsLoadedAndDisplayed([confluenceHome.appNavigationHomeLogo, confluenceHome.pageTree]);
    });

    after(async function () {
      // Logout the currently logged in user before we continue
      await loginPage.logoutUser();
    });

    it('should not display the restrictions lock icons to the user', async function () {
      userPage.findElement(userPage.restrictionsIconUnlocked).catch(error => {
        expect(error.name).to.equal('NoSuchElementError');
      });

      userPage.findElement(userPage.restrictionsIconlocked).catch(error => {
        expect(error.name).to.equal('NoSuchElementError');
      });
    });

    it('should not display the edit page link to the user', async function () {
      userPage.findElement(userPage.editPageLinkIcon).catch(error => {
        expect(error.name).to.equal('NoSuchElementError');
      });
    });

    it('should see the request access section on the page', async function () {
      expect(await userPage.isElementDisplayedAndHasText(userPage.userRestrictedFromPageText, 'You\'ve stumbled on restricted content')).to.equal(true);
      expect(await userPage.isElementDisplayedAndHasText(userPage.requestAccessButton, 'Request access')).to.equal(true);
    });

    it('should not be able to edit the page if user navigates to the edit page via URL', async function () {
      // This test is set to fail so that the report and screenshot generation can be demonstrated. In order to fix the test, change the assertion on line 115 to true
      await userPage.getUrl(ApplicationPaths.samplePageUser2EditLink);
      await userPage.waitUntilPageElementsLoadedAndDisplayed([userPage.userRestrictedFromEditingPageText, userPage.requestAccessButton]);
      expect(await userPage.isElementDisplayedAndHasText(userPage.userRestrictedFromEditingPageText, 'Editing is restricted for this content')).to.equal(true);
      expect(await userPage.isElementDisplayedAndHasText(userPage.requestAccessButton, 'Request access')).to.equal(false);
    });
  });
});
