import { browser } from 'protractor';
import { BCPInfoPage } from './bcp-pa.po';
import { PRACTITIONER_REGISTRATION_PAGES } from '../../../src/app/modules/practitioner-registration/practitioner-registration-route-constants';

describe('BCP Practitioner Assignment- Info Page (Unit Test)', () => {

    let infoPage: BCPInfoPage;
    let index = 0;

    beforeEach(() => {
        infoPage = new BCPInfoPage();
    });
    afterEach(() => {
        index++;
    });

    it('01. should be a MATCH since the facility number and postal code are valid', () => {
        infoPage.navigateTo();
        infoPage.fillPage(index);
        infoPage.clickContinue();
        expect(browser.getCurrentUrl()).toContain(PRACTITIONER_REGISTRATION_PAGES.PRACTITIONER_ASSIGN.fullpath, 'should continue to the next page');
    }, 100000);

    it('02. should be a NO MATCH (hard stop) since the information doesnt match the records', () => {
        infoPage.navigateTo();
        infoPage.fillPage(index);
        infoPage.clickContinue();
        expect(browser.getCurrentUrl()).toContain(PRACTITIONER_REGISTRATION_PAGES.FACILITY_INFO.fullpath, 'should NOT navigate to the next page - hard stop');
    }, 100000);

    it('03. should be a MATCH since the facility number and postal code are valid', () => {
        infoPage.navigateTo();
        infoPage.fillPage(index);
        browser.sleep(10000);
        infoPage.clickContinue();
        expect(browser.getCurrentUrl()).toContain(PRACTITIONER_REGISTRATION_PAGES.PRACTITIONER_ASSIGN.fullpath, 'should continue to the next page');
    }, 100000);

    it('04. should be a MATCH since the facility number and postal code are valid', () => {
        infoPage.navigateTo();
        infoPage.fillPage(index);
        browser.sleep(10000);
        infoPage.clickContinue();
        expect(browser.getCurrentUrl()).toContain(PRACTITIONER_REGISTRATION_PAGES.PRACTITIONER_ASSIGN.fullpath, 'should continue to the next page');
    }, 100000);

});
