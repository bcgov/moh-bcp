import { browser } from 'protractor';
import { BCPHomePage, BCPPractitionerInfoPage, BCPFacilityInfoPage, BCPPractitionerAttachmentPage, BCPReviewPage, BCPConfirmationPage } from './bcp-pa.po';
import { PRACTITIONER_REGISTRATION_PAGES } from '../../../src/app/modules/practitioner-registration/practitioner-registration-route-constants';

describe('BCP Practitioner Assignment- Happy Path e2e', () => {

    let homePage: BCPHomePage;
    let pracInfoPage: BCPPractitionerInfoPage;
    let faciInfoPage: BCPFacilityInfoPage;
    let pracAttachPage: BCPPractitionerAttachmentPage;
    let reviewPage: BCPReviewPage;
    let confirmationPage: BCPConfirmationPage;
    let index = 0;

    beforeEach(() => {
        homePage = new BCPHomePage();
        pracInfoPage = new BCPPractitionerInfoPage();
        faciInfoPage = new BCPFacilityInfoPage();
        pracAttachPage = new BCPPractitionerAttachmentPage();
        reviewPage = new BCPReviewPage();
        confirmationPage = new BCPConfirmationPage();
    });
    afterEach(() => {
        index++;
    });

    it('01. should sucesfully send the form and display the yellow border in the confirmation page', () => {

        expect(browser.getCurrentUrl()).toContain(PRACTITIONER_REGISTRATION_PAGES.SUBMISSION.fullpath, 'should be able to go to the Submission Page');
    }, 100000);

});
