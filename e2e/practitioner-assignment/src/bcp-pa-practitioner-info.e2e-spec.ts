import { browser } from 'protractor';
import { BCPPractitionerInfoPage } from './bcp-pa.po';
import { PRACTITIONER_REGISTRATION_PAGES } from '../../../src/app/modules/practitioner-registration/practitioner-registration-route-constants';

describe('BCP Practitioner Assignment - Practitioner Info Page (Unit Test)', () => {

    let pracInfoPage: BCPPractitionerInfoPage;
    let index = 0;


    beforeEach(() => {
        pracInfoPage = new BCPPractitionerInfoPage();
    });
    afterEach(() => {
        index++;
    });

    it('01. should be a NO MATCH since the info data for chiropractor is invalid', () => {
        pracInfoPage.navigateTo();
        pracInfoPage.fillPage(index);
        pracInfoPage.clickContinue();
        expect(browser.getCurrentUrl()).toContain(PRACTITIONER_REGISTRATION_PAGES.PRACTITIONER_INFO.fullpath, 'should NOT navigate to the next page');
    }, 100000);

    it('02. should be a NO MATCH since the practitioner number for chiropractor is invalid', () => {
        pracInfoPage.navigateTo();
        pracInfoPage.fillPage(index);
        pracInfoPage.clickContinue();
        expect(browser.getCurrentUrl()).toContain(PRACTITIONER_REGISTRATION_PAGES.PRACTITIONER_INFO.fullpath, 'should NOT navigate to the next page');
    }, 100000);

    it('03. should be a MATCH since the admin info data for private practice is valid', () => {
        pracInfoPage.navigateTo();
        pracInfoPage.fillPage(index);
        pracInfoPage.clickContinue();
        expect(browser.getCurrentUrl()).toContain(PRACTITIONER_REGISTRATION_PAGES.FACILITY_INFO.fullpath, 'should go to the Facility Info Page');
    }, 100000);

    it('04. should be a NO MATCH since the last name for private practice is invalid', () => {
        pracInfoPage.navigateTo();
        pracInfoPage.fillPage(index);
        pracInfoPage.clickContinue();
        expect(browser.getCurrentUrl()).toContain(PRACTITIONER_REGISTRATION_PAGES.PRACTITIONER_INFO.fullpath, 'should NOT navigate to the next page');
    }, 100000);

});
