import { browser } from 'protractor';
import { BCPAdminPage } from './bcp-reg-facility.po';
import { CREATE_FACILITY_PAGES } from '../../../src/app/modules/create-facility/create-facility-route-constants';

describe('BCP Facility Info- Admin Info e2e test', () => {

    let adminPage: BCPAdminPage;
    let index = 0;

    beforeEach(() => {
        adminPage = new BCPAdminPage();
    });

    afterEach(() => {
        index++;
    });

    it('01. should be a MATCH since the admin info data for chiropractor is valid', () => {
        adminPage.navigateTo();
        adminPage.fillPage(index);
        adminPage.clickContinue();
        expect(browser.getCurrentUrl()).toContain(CREATE_FACILITY_PAGES.FACILITY_INFO.fullpath, 'should go to the Facility Info Page');
    }, 100000);

    it('02. should be a NO MATCH since the practitioner number for chiropractor is invalid', () => {
        adminPage.navigateTo();
        adminPage.fillPage(index);
        adminPage.clickContinue();
        expect(browser.getCurrentUrl()).toContain(CREATE_FACILITY_PAGES.FACILITY_ADMIN.fullpath, 'should NOT navigate to the next page');
    }, 100000);

    it('03. should be a MATCH since the admin info data for private practice is valid', () => {
        adminPage.navigateTo();
        adminPage.fillPage(index);
        adminPage.clickContinue();
        expect(browser.getCurrentUrl()).toContain(CREATE_FACILITY_PAGES.FACILITY_INFO.fullpath, 'should go to the Facility Info Page');
    }, 100000);

    it('04. should be a NO MATCH since the last name for private practice is invalid', () => {
        adminPage.navigateTo();
        adminPage.fillPage(index);
        adminPage.clickContinue();
        expect(browser.getCurrentUrl()).toContain(CREATE_FACILITY_PAGES.FACILITY_ADMIN.fullpath, 'should NOT navigate to the next page');
    }, 100000);

});
