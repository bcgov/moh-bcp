import { browser } from 'protractor';
import { BCPPractitionerAttachmentPage } from './bcp-pa.po';
import { PRACTITIONER_REGISTRATION_PAGES } from '../../../src/app/modules/practitioner-registration/practitioner-registration-route-constants';

xdescribe('BCP Practitioner Assignment - Practitioner Attachment Page (Unit Test)', () => {

    let pracAttachPage: BCPPractitionerAttachmentPage;
    let index = 0;


    beforeEach(() => {
        pracAttachPage = new BCPPractitionerAttachmentPage();
    });
    afterEach(() => {
        index++;
    });

    it('01. ...', () => {
        pracAttachPage.navigateTo();
        pracAttachPage.fillPage(index);
        pracAttachPage.clickContinue();
        expect(browser.getCurrentUrl()).toContain(PRACTITIONER_REGISTRATION_PAGES.REVIEW.fullpath, 'should navigate to the next page');
    }, 100000);

    it('02. ...', () => {
        pracAttachPage.navigateTo();
        pracAttachPage.fillPage(index);
        pracAttachPage.clickContinue();
        expect(browser.getCurrentUrl()).toContain(PRACTITIONER_REGISTRATION_PAGES.REVIEW.fullpath, 'should navigate to the next page');
    }, 100000);
});
