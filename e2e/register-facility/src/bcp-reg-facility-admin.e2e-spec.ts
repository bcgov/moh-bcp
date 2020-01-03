import { browser } from 'protractor';
import { BCPAdminPage } from './bcp-reg-facility.po';
import { CREATE_FACILITY_PAGES } from '../../../src/app/modules/create-facility/create-facility-route-constants';

describe('BCP Register Facility - Admin Page (Unit Test)', () => {

    let adminPage: BCPAdminPage;

    const DEFAULT_DATA = 0;
    const MAX_VAL_DATA = 1;

    beforeEach(() => {
        adminPage = new BCPAdminPage();
    });

    it('01. should not be able to continue if the required fields are not filled out', () => {
        adminPage.navigateTo();
        browser.sleep(10000);
        adminPage.clickContinue();
        expect(browser.getCurrentUrl()).toContain(CREATE_FACILITY_PAGES.FACILITY_ADMIN.fullpath, 'should stay on the same page');
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
        expect(browser.getCurrentUrl()).toContain(CREATE_FACILITY_PAGES.FACILITY_INFO.fullpath, 'should continue to the next page');
    });

});
