import { browser } from 'protractor';
import { BCPInfoPage } from './bcp-reg-facility.po';
import { CREATE_FACILITY_PAGES } from '../../../src/app/modules/create-facility/create-facility-route-constants';

describe('BCP Register Facility - Info Page (Unit Test)', () => {

    let infoPage: BCPInfoPage;
    let index = 0;

    beforeEach(() => {
        infoPage = new BCPInfoPage();
    });

    afterEach(() => {
        index++;
    });

    // VALIDATION TESTS
    it('01. should be able to continue if the facility name is VALID', () => {
        infoPage.navigateTo();
        infoPage.fillPage(index);
        infoPage.clickContinue();
        expect(browser.getCurrentUrl()).toContain(CREATE_FACILITY_PAGES.REVIEW.fullpath, 'should continue to the next page');
    });

    it('02. should be able to continue even if the facility name is INVALID', () => {
        infoPage.navigateTo();
        infoPage.fillPage(index);
        infoPage.clickContinue();
        expect(browser.getCurrentUrl()).toContain(CREATE_FACILITY_PAGES.REVIEW.fullpath, 'should continue to the next page');
    });

});
