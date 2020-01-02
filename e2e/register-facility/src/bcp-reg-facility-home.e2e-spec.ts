import { browser } from 'protractor';
import { BCPHomePage, BCPBasePage } from './bcp-reg-facility.po';

describe('BCP Register Facility - Home Page (Unit Test)', () => {

    let page: BCPBasePage;
    let homePage: BCPHomePage;
    const HOME_PAGE_URL = `/bcp/register-facility/home`;
    const ADMIN_PAGE_URL = `/bcp/register-facility/administrator-information`;

    beforeEach(() => {
        homePage = new BCPHomePage();
        page = new BCPBasePage();
    });

    it('01. should not be able to continue if captcha is empty', () => {
        homePage.navigateTo();
        homePage.clickModalContinue();
        expect(browser.getCurrentUrl()).toContain(HOME_PAGE_URL, 'the modal should stay and user cant continue');
    });

    it('02. should not be able to continue if captcha is wrong/invalid', () => {
        homePage.navigateTo();
        homePage.typeCaptcha('sample');
        homePage.clickModalContinue();
        expect(browser.getCurrentUrl()).toContain(HOME_PAGE_URL, 'the modal should stay and user cant continue');
    });

    it('03. should be able to continue if captcha is correct', () => {
        homePage.navigateTo();
        homePage.typeCaptcha('irobot');
        homePage.checkConsent();
        homePage.clickModalContinue();
        homePage.clickContinue();
        expect(browser.getCurrentUrl()).toContain(ADMIN_PAGE_URL, 'should continue to the Facility Admin Page');
    });

});
