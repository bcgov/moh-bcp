import { browser, by, element, protractor, Key } from 'protractor';
import { AbstractTestPage } from "moh-common-lib/e2e";
import * as fs from 'fs';

/**
 * This class is for GENERAL functions, and all those that target components
 * from the moh-common-lib.  The long-term plan will be to move these over to
 * `moh-common-lib/testing` once created. That way different Angular projects
 * can use the same e2e starting board.
 */

export function getJSONData() {
    const x = process.argv;
    const input = process.argv.filter(x => x.startsWith('--data'));
    if (input.toString() !== '') {
        const filename = input.toString().split('=')[1];
        const data = fs.readFileSync(filename, 'utf8');
        const jsonData = JSON.parse(data);
        return jsonData;
    } else {
        return null;
    }
}

export class BCPBasePage extends AbstractTestPage {

    protected jsonData = getJSONData();

    navigateTo() {
        return browser.get('');
    }

    clickContinue() {
        element(by.cssContainingText('button', ' Continue ')).click();
    }

    typeText(labelVal: string, text: string) {
        element(by.cssContainingText('label', `${labelVal}`)).element(by.xpath('../..')).element(by.css('input')).sendKeys(text);
    }

    clickOption(legendVal: string, forVal: string) {
        element(by.cssContainingText('legend', `${legendVal}`)).element(by.xpath('../..')).element(by.css(`label[for^="${forVal}"]`)).click();
    }
}

export class BCPHomePage extends BCPBasePage {

    navigateTo() {
      return browser.get('/bcp/register-facility/home');
    }

    typeCaptcha() {
        element(by.css('input[id="answer"]')).sendKeys('irobot');
    }

    checkConsent() {
        element(by.css('label[for="agree"]')).click();
    }

    clickModalContinue() {
        element(by.css('button[type="submit"]')).click();
    }
    
    fillPage() {
        this.typeCaptcha();
        this.checkConsent();
        this.clickModalContinue();
        this.clickContinue();
    }
}

export class BCPAdminPage extends BCPBasePage {

    navigateTo() {
      return browser.get('/bcp/register-facility/facility-administrator');
    }

    fillPage() {
        this.typeText('Facility administrator first name', this.jsonData.facilityAdminFirstName);
        this.typeText('Facility administrator last name', this.jsonData.facilityAdminLastName);
        this.typeText('Medical services plan practitioner number', this.jsonData.MSPPractitionerNum);
        this.typeText('Email', this.jsonData.emailAdd);
        this.typeText('Confirm email address', this.jsonData.confirmEmailAdd);
        this.typeText('Phone Number', this.jsonData.phoneNum);
        this.typeText('Extension', this.jsonData.extension);
        this.clickContinue();
    }
}

export class BCPInfoPage extends BCPBasePage {

    navigateTo() {
        return browser.get('/bcp/register-facility/facility-info');
    }

    typeMailingCity(text: string) {
        element(by.css('common-city[name="mailingCity"]')).element(by.css('input')).sendKeys(text);
    }

    typeMailingPostal(text: string) {
        element(by.css('common-postal[name="mailingPostalCode"]')).element(by.css('input')).sendKeys(text);
    }

    typeDate(legendVal: string, year: string, month: string, day: string) {
        element(by.cssContainingText('legend', `${legendVal}`)).element(by.xpath('../..')).element(by.css('select[id^="month"]')).click();
        element(by.cssContainingText('legend', `${legendVal}`)).element(by.xpath('../..')).element(by.css(`option[value="${month}"]`)).click();
        element(by.cssContainingText('legend', `${legendVal}`)).element(by.xpath('../..')).element(by.css(`input[id^="day"]`)).sendKeys(day);
        element(by.cssContainingText('legend', `${legendVal}`)).element(by.xpath('../..')).element(by.css(`input[id^="year"]`)).sendKeys(year);
    }

    fillPage() {
        this.typeText('Facility Name', this.jsonData.facilityName);
        this.typeText('Physical Address', this.jsonData.address);
        this.typeText('City', this.jsonData.city);
        this.typeText('Postal Code', this.jsonData.postal);
        this.typeText('Fax Number', this.jsonData.faxNum);

        var effectiveDate = this.jsonData.effectiveDate;
        const year = effectiveDate.split('-')[0];
        const month = effectiveDate.split('-')[1];
        const day = effectiveDate.split('-')[2];
        this.typeDate('Effective Date', year, month, day);
        this.scrollDown();
        this.clickOption('Is the mailing address the same as the Physical Facility Address?', this.jsonData.hasSameMailingAddress.toString());
        if(!this.jsonData.hasSameMailingAddress){
            this.typeText('Mailing Address', this.jsonData.mailingAddress);
            this.typeMailingCity(this.jsonData.mailingCity);
            this.typeMailingPostal(this.jsonData.mailingPostal);
        }
        this.clickOption('Does your business qualify for the Business Cost Premium?', this.jsonData.qualifyForBCP.toString());
        this.clickContinue();
    }
}

export class BCPReviewPage extends BCPBasePage {

    navigateTo() {
        return browser.get('/bcp/register-facility/review');
    }

    clickSubmit() {
        element(by.cssContainingText('button', ' Submit ')).click();
    }

    clickConfirm(text: string) {
        element(by.cssContainingText('label', `${text}`)).click();
    }

    writeSignature(){
        element(by.css('canvas')).click();
    }

    fillPage() {
        this.scrollDown();
        this.clickConfirm('I confirm that I have read and agree to the above statement');
        this.writeSignature();
        this.clickSubmit();
    }

}