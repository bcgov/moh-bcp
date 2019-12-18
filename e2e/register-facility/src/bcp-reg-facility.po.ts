import { browser, by, element, protractor, Key } from 'protractor';
import { AbstractTestPage } from "moh-common-lib/e2e";
import * as fs from 'fs';
import * as sampleFile from './bcp-sample-data.json'; 

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
        return JSON.parse(data);
    } else {
        return sampleFile;
    }
}

export class BCPBasePage extends AbstractTestPage {

    protected jsonData = getJSONData();
    protected index: number;
    
    setIndex(index: number){
        this.index = index;
    }

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
    
    fillPage(index: number) {
        this.setIndex(index);
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

    fillPage(index: number) {
        this.setIndex(index);
        this.typeText('First name', this.jsonData[this.index].facilityAdminFirstName);
        this.typeText('Last name', this.jsonData[this.index].facilityAdminLastName);
        this.typeText('Medical services plan practitioner number', this.jsonData[this.index].MSPPractitionerNum);
        this.typeText('Email address (optional)', this.jsonData[this.index].emailAdd);
        this.typeText('Phone number', this.jsonData[this.index].phoneNum);
        this.typeText('Extension', this.jsonData[this.index].extension);
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
        var months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];
        element(by.cssContainingText('legend', `${legendVal}`)).element(by.xpath('../..')).element(by.css('select[id^="month"]')).sendKeys(months[parseInt(month)-1]);
        //element(by.cssContainingText('legend', `${legendVal}`)).element(by.xpath('../..')).element(by.css(`option[value="${month}"]`)).click();
        element(by.cssContainingText('legend', `${legendVal}`)).element(by.xpath('../..')).element(by.css(`input[id^="day"]`)).sendKeys(day);
        element(by.cssContainingText('legend', `${legendVal}`)).element(by.xpath('../..')).element(by.css(`input[id^="year"]`)).sendKeys(year);
    }

    fillPage(index: number) {
        this.setIndex(index);
        this.typeText('Facility or practice name', this.jsonData[this.index].facilityName);
        this.typeText('Physical address', this.jsonData[this.index].address);
        this.typeText('City', this.jsonData[this.index].city);
        this.typeText('Postal code', this.jsonData[this.index].postal);
        this.typeText('Fax number', this.jsonData[this.index].faxNum);

        var effectiveDate = this.jsonData[this.index].effectiveDate;
        const year = effectiveDate.split('-')[0];
        const month = effectiveDate.split('-')[1];
        const day = effectiveDate.split('-')[2];
        this.typeDate('Effective date', year, month, day);
        this.scrollDown();
        this.clickOption('Is the mailing address the same as the Physical Facility Address?', this.jsonData[this.index].hasSameMailingAddress.toString());
        if(!this.jsonData[this.index].hasSameMailingAddress){
            this.typeText('Mailing address', this.jsonData[this.index].mailingAddress);
            this.typeMailingCity(this.jsonData[this.index].mailingCity);
            this.typeMailingPostal(this.jsonData[this.index].mailingPostal);
        }
        this.clickOption('Does your business qualify for the Business Cost Premium?', this.jsonData[this.index].qualifyForBCP.toString());
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
        element(by.cssContainingText('button', 'Sign')).click();
        element(by.css('canvas')).click();
        element(by.cssContainingText('button', 'Accept')).click();
    }

    fillPage(index: number) {
        this.setIndex(index);
        this.scrollDown();
        // this.clickConfirm('I confirm that I have read and agree to the above statement');
        this.writeSignature();
        this.clickSubmit();
    }

}