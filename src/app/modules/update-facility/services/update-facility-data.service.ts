import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BaseDataService } from '../../../services/base-data.service';
import { BRITISH_COLUMBIA } from 'moh-common-lib';
import {
  prepareDeclarationTextForAPI,
  stripPostalCodeSpaces,
  stripPhoneFormatting,
  convertToJSONDate } from '../../core-bcp/models/helperFunc';

@Injectable({
  providedIn: 'root'
})
export class UpdateFacilityDataService extends BaseDataService {

  constructor() {
    super();
    if (environment.useDummyData) {
      this.firstName = 'Mock First Name';
      this.lastName = 'Mock Last Name';
      this.email = 'test@example.com';
      this.phone = '250-123-1234';
      this.phoneExt = '123';
      this.facilityName = 'Test Facility';
      this.facilityMSPNumber = '89902';
      this.facilityFax = '251-123-1234';

      this.checkChangeAdminInfo = true;
      this.changeAdminInfoFirstName = 'TEST';
      this.changeAdminInfoLastName = 'PRIVATEPRACTICE';
      this.changeAdminInfoMSPPracNumber = '89902';
      this.changeAdminInfoEmail = 'email@email.com';
      this.changeAdminInfoPhoneNumber = '2501231231';
      this.changeAdminInfoEffectiveDate = new Date(2020, 3, 1);
    }

        // Partial setup for using data in back end
    if (environment.useMockBackendData) {
    }
  }

  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  phoneExt: string;
  facilityName: string;
  facilityMSPNumber: string;
  facilityFax: string;

  checkChangeFacilityAddress: boolean = false;
  checkChangeMailingAddress: boolean = false;
  checkChangeAppliesFees: boolean = false;
  checkCancelBCP: boolean = false;
  checkChangeBCPEffectiveDate: boolean = false;
  checkChangeBCPCancelDate: boolean = false;
  checkChangeAdminInfo: boolean = false;
  checkCancelFacilityNumber: boolean = false;
  otherChangeRequests: string = '';

  changeFacilityAddressPreviousAddress: string;
  changeFacilityAddressPreviousCity: string;
  changeFacilityAddressPreviousPostalCode: string;
  changeFacilityAddressPreviousFax: string;
  changeFacilityAddressNewAddress: string;
  changeFacilityAddressNewCity: string;
  changeFacilityAddressNewPostalCode: string;
  changeFacilityAddressNewFax: string;
  changeFacilityAddressEffectiveDate: Date;

  changeMailingAddressPreviousAddress: string;
  changeMailingAddressPreviousCity: string;
  changeMailingAddressPreviousPostalCode: string;
  changeMailingAddressNewAddress: string;
  changeMailingAddressNewCity: string;
  changeMailingAddressNewPostalCode: string;
  changeMailingAddressEffectiveDate: Date;

  changeAppliesFeesEffectiveDate: Date;
  cancelBCPEffectiveDate: Date;
  changeBCPEffectiveDateEffectiveDate: Date;
  changeBCPCancelDateCancelDate: Date;

  changeAdminInfoFirstName: string;
  changeAdminInfoLastName: string;
  changeAdminInfoMSPPracNumber: string;
  changeAdminInfoEmail: string;
  changeAdminInfoPhoneNumber: string;
  changeAdminInfoPhoneNumberExt: string;
  changeAdminInfoEffectiveDate: Date;

  cancelFacilityNumberCancelDate: Date;


  jsonSubmission = {
    request: null,
    response: null
  };

  readonly declarationText = `I, the Practitioner named above, hereby confirm that: by checking either "Add New", "Cancel" above, or by requesting an "Other Change", I am either adding, changing details of, or cancelling an attachment to the MSP Facility Number set out in this document, as the case may be. In the case of adding an attachment or changing details of an attachment to the above MSP Facility Number:
  <ol class='no-bullets'>
      <li>i. I am an Eligible Physician regarding the facility that has been issued the MSP Facility Number named in this document, and that I understand that my claims for the Business Cost Premium on Eligible Fees will be based on my attachment to the MSP Facility Number named in this document;</li>
      <li>ii. this attachment will result in the Business Cost Premium being applied to all Eligible Fees on claims submitted, in the format approved by the Medical Services Commission of British Columbia bearing my Practitioner Number and the MSP Facility Number of the facility named in this document;</li>
      <li>iii. I understand that this is a legal document and I represent that the information that I have provided on this document is true to the best of my knowledge;</li>
      <li>iv. I understand that claims in relation to the Business Cost Premium are subject to audit, and if found to be contrary to the <em>Medicare Protection Act (the "Act")</em>, are subject to financial recovery.  I further understand that submitting false or misleading claims information is an offence under the Act and may be an offence under the Criminal Code of Canada;</li>
      <li>v. I authorize the sharing of this information with the Administrator for the facility named in this document, including the delivery of this information to the facility mailing address for the purposes of confirmation of my attachment to the MSP Facility Number; and</li>
      <li>vi. If, at any point, I am no longer an Eligible Physician with regard to the facility named in this document, I will submit a form for cancellation of my attachment to this MSP Facility Number to Health Insurance BC.</li>
  </ol>`;

  get declarationTextForAPI() {
    return prepareDeclarationTextForAPI(this.declarationText);
  }

  // Abstract method
  getJSONPayload() {

    const jsonPayLoad: any = {

      informationConsentAgreement: this.informationCollectionNoticeConsent,
      administrator: {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phoneNumber: this.phone,
        extension: this.phoneExt
      },
      facility: {
        name: this.facilityName,
        number: this.facilityMSPNumber,
        faxNumber: this.facilityFax,
      },
      changeFacilityAddress: {
        prevAddress: this.changeFacilityAddressPreviousAddress,
        prevCity: this.changeFacilityAddressPreviousCity,
        prevProvince: 'BC',
        prevPostalCode: stripPostalCodeSpaces(this.changeFacilityAddressPreviousPostalCode),
        prevFaxNumber: stripPhoneFormatting(this.changeFacilityAddressPreviousFax),
        newAddress: this.changeFacilityAddressNewAddress,
        newCity: this.changeFacilityAddressNewCity,
        newProvince: 'BC',
        newPostalCode: stripPostalCodeSpaces(this.changeFacilityAddressNewPostalCode),
        newFaxNumber: stripPhoneFormatting(this.changeFacilityAddressNewFax),
        effectiveDate: convertToJSONDate(this.changeFacilityAddressEffectiveDate)
      },
      changeMailingAddress: {
        prevAddress: this.changeMailingAddressPreviousAddress,
        prevCity: this.changeMailingAddressPreviousCity,
        prevProvince: 'BC',
        prevPostalCode: stripPostalCodeSpaces(this.changeMailingAddressPreviousPostalCode),
        newAddress: this.changeMailingAddressNewAddress,
        newCity: this.changeMailingAddressNewCity,
        newProvince: 'BC',
        newPostalCode: stripPostalCodeSpaces(this.changeMailingAddressNewPostalCode),
        effectiveDate: convertToJSONDate(this.changeMailingAddressEffectiveDate)
      },
      requestBCP: {
        effectiveDate: convertToJSONDate(this.changeAppliesFeesEffectiveDate)
      },
      cancelBCP: {
        cancelDate: convertToJSONDate(this.cancelBCPEffectiveDate)
      },
      changeBCPEffectiveDate: {
        effectiveDate: convertToJSONDate(this.changeBCPEffectiveDateEffectiveDate)
      },
      changeBCPCancelDate: {
        cancelDate: convertToJSONDate(this.changeBCPCancelDateCancelDate)
      },
      changeAdministrator: {
        firstName: this.changeAdminInfoFirstName,
        lastName: this.changeAdminInfoLastName,
        pracNumber: this.changeAdminInfoMSPPracNumber,
        email: this.changeAdminInfoEmail,
        phoneNumber: this.changeAdminInfoPhoneNumber,
        extension: this.changeAdminInfoPhoneNumberExt,
        effectiveDate: convertToJSONDate(this.changeAdminInfoEffectiveDate)
      },
      cancelFacilityNumber: {
        cancelDate: convertToJSONDate(this.cancelFacilityNumberCancelDate)
      },
      otherChange: {
        request: this.otherChangeRequests
      },
      // Update section for schema - needs to be reflected in the data service to only have 2 dates to keep code maintainable
      dateOfAcceptance: convertToJSONDate(this.dateOfAcceptance),
      declarationText: this.declarationTextForAPI,
    };

    return jsonPayLoad;
  }

}
