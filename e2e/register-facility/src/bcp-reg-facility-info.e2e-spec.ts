import { browser } from 'protractor';
import { BCPInfoPage } from './bcp-reg-facility.po';
import { CREATE_FACILITY_PAGES } from '../../../src/app/modules/create-facility/create-facility-route-constants';

describe('BCP Register Facility - Info Page (Unit Test)', () => {

    let infoPage: BCPInfoPage;

    const DEFAULT_DATA = 0;
    const MAX_VAL_DATA = 1;

    beforeEach(() => {
        infoPage = new BCPInfoPage();
    });

    it('01. should not be able to continue if the required fields are not filled out', () => {
        infoPage.navigateTo();
        infoPage.clickContinue();
        expect(browser.getCurrentUrl()).toContain(CREATE_FACILITY_PAGES.FACILITY_INFO.fullpath, 'should stay on the same page');
    });

    it('02. should be able to input values in their maximum capacity', () => {
        infoPage.navigateTo();
        infoPage.fillPage(MAX_VAL_DATA);
        infoPage.checkInfoInputValues(MAX_VAL_DATA);
    });

    it('03. should be able to continue if all the required fields are filled out and valid', () => {
        infoPage.navigateTo();
        infoPage.fillPage(DEFAULT_DATA);
        infoPage.clickContinue();
        expect(browser.getCurrentUrl()).toContain(CREATE_FACILITY_PAGES.REVIEW.fullpath, 'should continue to the next page');
    });

});
