import { browser } from 'protractor';
import { BCPAdminPage } from './bcp-reg-facility.po';

describe('BCP Register Facility - Admin Page (Unit Test)', () => {

    let adminPage: BCPAdminPage;

    const DEFAULT_DATA = 0;
    const MAX_VAL_DATA = 1;
    const ADMIN_PAGE_URL = `/bcp/register-facility/facility-administrator`;
    const INFO_PAGE_URL = `/bcp/register-facility/facility-info`;

    beforeEach(() => {
        adminPage = new BCPAdminPage();
    });

    it('01. should not be able to continue if the required fields are not filled out', () => {
        adminPage.navigateTo();
        adminPage.clickContinue();
        expect(browser.getCurrentUrl()).toContain(ADMIN_PAGE_URL, 'should stay on the same page');
    });

    it('02. should be able to input values in their maximum capcity', () => {
        adminPage.navigateTo();
        adminPage.fillPage(MAX_VAL_DATA);
        adminPage.checkAdminInputValues(MAX_VAL_DATA);
    });

    it('03. should be able to continue if all the required fields are filled out and valid', () => {
        adminPage.navigateTo();
        adminPage.fillPage(DEFAULT_DATA);
        adminPage.clickContinue();
        expect(browser.getCurrentUrl()).toContain(INFO_PAGE_URL, 'should continue to the next page');
    });

});
