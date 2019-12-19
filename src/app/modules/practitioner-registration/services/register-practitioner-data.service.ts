import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BaseDataService } from '../../../services/base-data.service';
import { BRITISH_COLUMBIA } from 'moh-common-lib';
import { prepareDeclarationTextForAPI } from '../../core-bcp/models/helperFunc';

@Injectable({
  providedIn: 'root'
})
export class RegisterPractitionerDataService extends BaseDataService {

  constructor() {
    super();
    if (environment.useDummyData) {
      this.pracInfoFirstName = 'John';
      this.pracInfoLastName = 'Doe';
      this.pracInfoMSPPracNumber = '12345';
      this.pracInfoEmail = 'john.doe@example.com';
      this.pracInfoPhoneNumber = '234 567-8901';
      this.pracInfoPhoneNumberExt = '123';

      this.pracFacilityName = 'Medical Facility';
      this.pracFacilityNumber = '12345';
      this.pracFacilityAddress = '123 Fake St.';
      this.pracFacilityCity = 'Victoria';
      this.pracFacilityProvince = BRITISH_COLUMBIA;
      this.pracFacilityPostalCode = 'V8L 1A1';
      this.pracFacilityFaxNumber = '234 567-8901';

      this.pracAttachmentType = 'new';
    }
  }

  pracInfoFirstName: string;
  pracInfoLastName: string;
  pracInfoMSPPracNumber: string;
  pracInfoEmail: string;
  pracInfoPhoneNumber: string;
  pracInfoPhoneNumberExt: string;

  pracFacilityName: string;
  pracFacilityNumber: string;
  pracFacilityAddress: string;
  pracFacilityCity: string;
  pracFacilityProvince: string = BRITISH_COLUMBIA;
  pracFacilityPostalCode: string;
  pracFacilityFaxNumber: string;

  pracAttachmentType: string;
  pracNewAttachmentType: boolean;
  pracNewAttachmentEffectiveDate: Date;
  pracNewAttachmentCancelDate: Date;
  pracCancelAttachmentDate: Date;
  pracChangeAttachmentEffectiveDate: Date;
  pracChangeAttachmentCancelDate: Date;

  jsonMaintPractitioner = {
    request: null,
    response: null
  };

  isAccepted: boolean;

  readonly declarationText = `I, the Practitioner named above, hereby confirm that: --by checking either "Add New", "Change", or "Cancel" above, I am either adding, changing details of, or cancelling an attachment to the MSP Facility Number set out in this document, as the case may be. In the case of adding an attachment or changing details of an attachment to the above MSP Facility Number:
  <ol class='no-bullets'>
      <li>i. I am an Eligible Physician regarding the facility that has been issued the MSP Facility Number named in this document, and that I understand that my claims for the Business Cost Premium on Eligible Fees will be based on my attachment to the MSP Facility Number named in this document;</li>
      <li>ii. his attachment will result in the Business Cost Premium being applied to all Eligible Fees on claims submitted, in the format approved by the Medical Services Commission of British Columbia bearing my Practitioner Number and the MSP Facility number of the facility named in this document;</li>
      <li>iii. I understand that this is a legal document and I represent that the information that I have provided on this document is true to the best of my knowledge;</li>
      <li>iv. I understand that claims in relation to the Business Cost Premium are subject to audit, and if found to be contrary to the Medicare Protection Act (the "Act"), are subject to financial recovery.  I further understand that submitting false or misleading claims information is an offence under the Act and may be an offence under the Criminal Code of Canada;</li>
      <li>v. I authorize the sharing of this information with the Administrator for the facility named in this document, including the delivery of this information to the facility mailing address for the purposes of confirmation of my attachment to the MSP Facility Number; and</li>
      <li>vi. If, at any point, I am no longer an Eligible Physician with regard to the facility named in this document, I will submit a form for cancellation of my attachment to this MSP Facility Number to Health Insurance BC.</li>
  </ol>`;

  get declarationTextForAPI() {
    return prepareDeclarationTextForAPI(this.declarationText);
  }
}
