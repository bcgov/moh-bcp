import { browser } from 'protractor';
import { BCPHomePage, BCPAdminPage, BCPInfoPage, BCPReviewPage, BCPBasePage, getJSONData } from './bcp-reg-facility.po';

let homePage: BCPHomePage;
let adminPage: BCPAdminPage;
let infoPage: BCPInfoPage;
let reviewPage: BCPReviewPage;
let page: BCPBasePage;
let index = 0;

const ADMIN_PAGE_URL = `/bcp/register-facility/facility-administrator`;
const INFO_PAGE_URL = `/bcp/register-facility/facility-info`;
const REVIEW_PAGE_URL = `/bcp/register-facility/review`;
const SUBMISSION_PAGE_URL = `/bcp/register-facility/submission`;

export function regFacilityTest(index: number) {
    it('should navigate from Home Page to Submission Page (end-to-end) when all required fields are filled out', () => {
        homePage.navigateTo();
        homePage.fillPage(index);
        expect(browser.getCurrentUrl()).toContain(ADMIN_PAGE_URL, 'should navigate to the Facility Admin Page');
        adminPage.fillPage(index);
        expect(browser.getCurrentUrl()).toContain(INFO_PAGE_URL, 'should navigate to the Facility Info Page');
        infoPage.fillPage(index);
        expect(browser.getCurrentUrl()).toContain(REVIEW_PAGE_URL, 'should navigate to the Review Page');
        reviewPage.fillPage(index);
        expect(browser.getCurrentUrl()).toContain(SUBMISSION_PAGE_URL, 'should navigate to the Submission Page');
    }, 100000);
}

xdescribe('BCP Register Facility - End to End Test (Happy Path)', () => {

    beforeEach(() => {
        homePage = new BCPHomePage();
        adminPage = new BCPAdminPage();
        infoPage = new BCPInfoPage();
        reviewPage = new BCPReviewPage();
        page = new BCPBasePage();
    });

    /*
    while(index < Object.keys(getJSONData()).length - 1){
        regFacilityTest(index);
        index++;
    }
    */

});
