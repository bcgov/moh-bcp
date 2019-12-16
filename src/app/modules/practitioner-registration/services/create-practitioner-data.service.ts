import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CommonImage } from 'moh-common-lib';

@Injectable({
  providedIn: 'root'
})
export class CreatePractitionerDataService {

  constructor() {
    if (environment.useDummyData) {
      this.pracInfoFirstName = 'John';
      this.pracInfoLastName = 'Doe';
      this.pracInfoMSPPracNumber = '12345';
      this.pracInfoEmail = 'john.doe@example.com';
      this.pracInfoPhoneNumber = '234 567-8901';
      this.pracInfoPhoneNumberExt = '123';
      this.pracInfoFaxNumber = '456 789-1230';

      this.pracFacilityName = 'Medical Facility';
      this.pracFacilityNumber = '12345';
      this.pracFacilityAddress = '123 Fake St.';
      this.pracFacilityCity = 'Victoria';
      this.pracFacilityProvince = 'BC';
      this.pracFacilityPostalCode = 'V8L 1A1';
      this.pracFacilityFax = '123 456-7890';

      this.pracAttachmentType = 'new';
    }
  }

  pracInfoFirstName: string;
  pracInfoLastName: string;
  pracInfoMSPPracNumber: string;
  pracInfoEmail: string;
  pracInfoPhoneNumber: string;
  pracInfoPhoneNumberExt: string;
  pracInfoFaxNumber: string;

  pracFacilityName: string;
  pracFacilityNumber: string;
  pracFacilityAddress: string;
  pracFacilityCity: string;
  pracFacilityProvince: string = 'BC';
  pracFacilityPostalCode: string;
  pracFacilityFax: string;

  pracAttachmentType: string;
  pracNewAttachmentType: string;
  pracNewAttachmentEffectiveDate: Date;
  pracNewAttachmentCancelDate: Date;
  pracCancelAttachmentDate: Date;
  pracChangeAttachmentEffectiveDate: Date;
  pracChangeAttachmentCancelDate: Date;

  informationCollectionNoticeConsent: boolean;
  isAccepted: boolean;
  signature: CommonImage;
  dateOfAcceptance: Date;
}
