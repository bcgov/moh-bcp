import { browser } from 'protractor';
import { BCPHomePage, BCPAdminPage, BCPInfoPage, BCPReviewPage, BCPBasePage, getJSONData } from './bcp-reg-facility.po';
import { CREATE_FACILITY_PAGES } from '../../../src/app/modules/create-facility/create-facility-route-constants';

let homePage: BCPHomePage;
let adminPage: BCPAdminPage;
let infoPage: BCPInfoPage;
let reviewPage: BCPReviewPage;
let page: BCPBasePage;
let index = 0;

export function regFacilityTest(index: number) {
    it('should navigate from Home Page to Submission Page (end-to-end) when all required fields are filled out', () => {
        homePage.navigateTo();
        homePage.fillPage(index);
        expect(browser.getCurrentUrl()).toContain(CREATE_FACILITY_PAGES.FACILITY_ADMIN.fullpath, 'navigate to the Facility Admin Page');
        adminPage.fillPage(index);
        expect(browser.getCurrentUrl()).toContain(CREATE_FACILITY_PAGES.FACILITY_INFO.fullpath, 'navigate to the Facility Info Page');
        infoPage.fillPage(index);
        expect(browser.getCurrentUrl()).toContain(CREATE_FACILITY_PAGES.REVIEW.fullpath, 'should navigate to the Review Page');
        reviewPage.fillPage(index);
        expect(browser.getCurrentUrl()).toContain(CREATE_FACILITY_PAGES.SUBMISSION.fullpath, 'should navigate to the Submission Page');
    }, 100000);
}

describe('BCP Register Facility - End to End Test (Happy Path)', () => {

    beforeEach(() => {
        homePage = new BCPHomePage();
        adminPage = new BCPAdminPage();
        infoPage = new BCPInfoPage();
        reviewPage = new BCPReviewPage();
        page = new BCPBasePage();
    });

    while(index < Object.keys(getJSONData()).length - 1){
        regFacilityTest(index);
        index++;
    }

});
