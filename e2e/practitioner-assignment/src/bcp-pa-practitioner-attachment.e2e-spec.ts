import { browser } from 'protractor';
import { BCPPractitionerAttachmentPage, BCPPractitionerInfoPage, BCPFacilityInfoPage} from './bcp-pa.po';
import { PRACTITIONER_REGISTRATION_PAGES } from '../../../src/app/modules/practitioner-registration/practitioner-registration-route-constants';
import { constants } from 'perf_hooks';

describe('BCP Practitioner Assignment - Practitioner Attachment Page (Unit Test)', () => {

    let pracInfoPage: BCPPractitionerInfoPage;
    let faciInfoPage: BCPFacilityInfoPage;
    let pracAttachPage: BCPPractitionerAttachmentPage;
    const indexForValidData = 2;
    let index = 0;

    beforeEach(() => {
        pracInfoPage = new BCPPractitionerInfoPage();
        faciInfoPage = new BCPFacilityInfoPage();
        pracAttachPage = new BCPPractitionerAttachmentPage();
        pracInfoPage.navigateTo();
        pracInfoPage.fillPage(indexForValidData);
        pracInfoPage.continue();
        faciInfoPage.fillPage(indexForValidData);
        faciInfoPage.continue();
    });
    afterEach(() => {
        index++;
    });

    it('01. should be INVALID if Cancellation date is before the Effective date for new attachment', () => {
        pracAttachPage.fillPage(index);
        pracAttachPage.clickContinue();
        expect(browser.getCurrentUrl()).toContain(PRACTITIONER_REGISTRATION_PAGES.PRACTITIONER_ASSIGN.fullpath, 'should stay on the same page');
    }, 100000);

    it('02. should be VALID if Cancellation date is after the Effective date for new attachment', () => {
        pracAttachPage.fillPage(index);
        pracAttachPage.clickContinue();
        browser.sleep(5000);
        expect(browser.getCurrentUrl()).toContain(PRACTITIONER_REGISTRATION_PAGES.REVIEW.fullpath, 'should navigate on the next page');
    }, 100000);

    it('03. should be INVALID if Effective date is prior to April 01, 2020', () => {
        pracAttachPage.fillPage(index);
        pracAttachPage.clickContinue();
        expect(browser.getCurrentUrl()).toContain(PRACTITIONER_REGISTRATION_PAGES.PRACTITIONER_ASSIGN.fullpath, 'should stay on the same page');
    }, 100000);

    it('04. should be VALID if Effective date is after to April 01, 2020', () => {
        pracAttachPage.fillPage(index);
        pracAttachPage.clickContinue();
        expect(browser.getCurrentUrl()).toContain(PRACTITIONER_REGISTRATION_PAGES.REVIEW.fullpath, 'should navigate on the next page');
    }, 100000);

    it('05. should be INVALID if Cancellation date is prior to April 01, 2020', () => {
        pracAttachPage.fillPage(index);
        pracAttachPage.clickContinue();
        expect(browser.getCurrentUrl()).toContain(PRACTITIONER_REGISTRATION_PAGES.PRACTITIONER_ASSIGN.fullpath, 'should stay on the same page');
    }, 100000);

    it('06. should be VALID if Cancellation date is after to April 01, 2020', () => {
        pracAttachPage.fillPage(index);
        pracAttachPage.clickContinue();
        browser.sleep(5000);
        expect(browser.getCurrentUrl()).toContain(PRACTITIONER_REGISTRATION_PAGES.REVIEW.fullpath, 'should navigate on the next page');
    }, 100000);

    it('07. should be INVALID if Cancellation date for existing attachement is prior to April 01, 2020', () => {
        pracAttachPage.fillPage(index);
        pracAttachPage.clickContinue();
        expect(browser.getCurrentUrl()).toContain(PRACTITIONER_REGISTRATION_PAGES.PRACTITIONER_ASSIGN.fullpath, 'should stay on the same page');
    }, 100000);

    it('08. should be VALID if Cancellation date for existing attachment is after to April 01, 2020', () => {
        pracAttachPage.fillPage(index);
        pracAttachPage.clickContinue();
        expect(browser.getCurrentUrl()).toContain(PRACTITIONER_REGISTRATION_PAGES.REVIEW.fullpath, 'should navigate on the next page');
    }, 100000);
});
