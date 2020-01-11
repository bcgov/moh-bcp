import { browser } from 'protractor';
import { BCPAdminPage } from './bcp-pa.po';
import { PRACTITIONER_REGISTRATION_PAGES } from '../../../src/app/modules/practitioner-registration/practitioner-registration-route-constants';

describe('BCP Practitioner Assignment - Admin Page (Unit Test)', () => {

    let adminPage: BCPAdminPage;
    let index = 0;


    beforeEach(() => {
        adminPage = new BCPAdminPage();
    });
    afterEach(() => {
        index++;
    });

    it('01. should be a NO MATCH since the info data for chiropractor is invalid', () => {
        adminPage.navigateTo();
        adminPage.fillPage(index);
        adminPage.clickContinue();
        expect(browser.getCurrentUrl()).toContain(PRACTITIONER_REGISTRATION_PAGES.PRACTITIONER_INFO.fullpath, 'should NOT navigate to the next page');
    }, 100000);

    it('02. should be a NO MATCH since the practitioner number for chiropractor is invalid', () => {
        adminPage.navigateTo();
        adminPage.fillPage(index);
        adminPage.clickContinue();
        expect(browser.getCurrentUrl()).toContain(PRACTITIONER_REGISTRATION_PAGES.PRACTITIONER_INFO.fullpath, 'should NOT navigate to the next page');
    }, 100000);

    it('03. should be a MATCH since the admin info data for private practice is valid', () => {
        adminPage.navigateTo();
        adminPage.fillPage(index);
        adminPage.clickContinue();
        expect(browser.getCurrentUrl()).toContain(PRACTITIONER_REGISTRATION_PAGES.FACILITY_INFO.fullpath, 'should go to the Facility Info Page');
    }, 100000);

    it('04. should be a NO MATCH since the last name for private practice is invalid', () => {
        adminPage.navigateTo();
        adminPage.fillPage(index);
        adminPage.clickContinue();
        expect(browser.getCurrentUrl()).toContain(PRACTITIONER_REGISTRATION_PAGES.PRACTITIONER_INFO.fullpath, 'should NOT navigate to the next page');
    }, 100000);

});
