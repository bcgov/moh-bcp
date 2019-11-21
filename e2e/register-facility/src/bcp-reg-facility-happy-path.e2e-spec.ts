import { browser } from 'protractor';
import { BCPHomePage, BCPAdminPage, BCPInfoPage, BCPReviewPage } from './bcp-reg-facility.po';   

describe('BCP Register Facility - End to End Test (Happy Path)', () => {
    let homePage: BCPHomePage;
    let adminPage: BCPAdminPage;
    let infoPage: BCPInfoPage;
    let reviewPage: BCPReviewPage;

    const ADMIN_PAGE_URL = `/bcp/register-facility/facility-administrator`;
    const INFO_PAGE_URL = `/bcp/register-facility/facility-info`;
    const REVIEW_PAGE_URL = `/bcp/register-facility/review`;
    const SUBMISSION_PAGE_URL = `/bcp/register-facility/submission`;

    beforeEach(() => {
        homePage = new BCPHomePage();
        adminPage = new BCPAdminPage();
        infoPage = new BCPInfoPage();
        reviewPage = new BCPReviewPage();
    });

    afterEach(() => {
        browser.executeScript('window.sessionStorage.clear();');
        browser.executeScript('window.localStorage.clear();');
    });

    it('01. should navigate from Home Page to Submission Page (end-to-end) when all required fields are filled out', () => {
        homePage.navigateTo();
        homePage.fillPage();
        expect(browser.getCurrentUrl()).toContain(ADMIN_PAGE_URL, 'should navigate to the Facility Admin Page');
        adminPage.fillPage();
        expect(browser.getCurrentUrl()).toContain(INFO_PAGE_URL, 'should navigate to the Facility Info Page');
        infoPage.fillPage();
        expect(browser.getCurrentUrl()).toContain(REVIEW_PAGE_URL, 'should navigate to the Review Page');
        reviewPage.fillPage();
        expect(browser.getCurrentUrl()).toContain(SUBMISSION_PAGE_URL, 'should navigate to the Submission Page');
    }, 100000);

    // it('02. should navigate from Home Page to Submission Page (end-to-end) when all required fields are filled out', () => {
    //     homePage.navigateTo();
    //     homePage.fillPage();
    //     expect(browser.getCurrentUrl()).toContain(ADMIN_PAGE_URL, 'should navigate to the Facility Admin Page');
    //     adminPage.fillPage();
    //     expect(browser.getCurrentUrl()).toContain(INFO_PAGE_URL, 'should navigate to the Facility Info Page');
    //     infoPage.fillPage();
    //     expect(browser.getCurrentUrl()).toContain(REVIEW_PAGE_URL, 'should navigate to the Review Page');
    //     reviewPage.fillPage();
    //     expect(browser.getCurrentUrl()).toContain(SUBMISSION_PAGE_URL, 'should navigate to the Submission Page');
    // }, 100000);

});