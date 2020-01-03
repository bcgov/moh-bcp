import { browser } from 'protractor';
import { BCPAdminPage } from './bcp-pa.po';
import { PRACTITIONER_REGISTRATION_PAGES } from '../../../src/app/modules/practitioner-registration/practitioner-registration-route-constants';

describe('BCP Practitioner Assignment - Admin Page (Unit Test)', () => {

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
        // tslint:disable-next-line: max-line-length
        expect(browser.getCurrentUrl()).toContain(PRACTITIONER_REGISTRATION_PAGES.PRACTITIONER_INFO.fullpath, 'should stay on the same page');
    });

    it('02. should be able to input values in their maximum capcity', () => {
        adminPage.navigateTo();
        adminPage.fillPage(MAX_VAL_DATA);
        adminPage.checkAdminInputValues(MAX_VAL_DATA);
    });

    it('03. should be able to continue if all the required fields are filled out and valid', () => {
        adminPage.navigateTo();
        adminPage.fillPage(DEFAULT_DATA);
        browser.sleep(10000);
        adminPage.clickContinue();
        // tslint:disable-next-line: max-line-length
        expect(browser.getCurrentUrl()).toContain(PRACTITIONER_REGISTRATION_PAGES.FACILITY_INFO.fullpath, 'should continue to the next page');
    });

});
