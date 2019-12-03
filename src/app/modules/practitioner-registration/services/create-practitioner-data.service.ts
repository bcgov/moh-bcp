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
      this.pracInfoPhoneNumber = '123 456-7890'

      this.pracFacilityName = 'Medical Facility';
      this.pracFacilityNumber = '12345';
      this.pracFacilityAddress = '123 Fake St.';
      this.pracFacilityCity = 'Victoria';
      this.pracFacilityProvince = 'BC';
      this.pracFacilityPostalCode = 'V8L 1A1';
      this.pracFacilityFax = '123 456-7890';

      this.pracAttachmentType = 'PDF';
      this.pracAttachmentEffectiveDate = 'April 15, 2020';
      this.pracAttachmentCancellationDate = 'April 15, 2021';
    }
  }

  pracInfoFirstName: string;
  pracInfoLastName: string;
  pracInfoMSPPracNumber: string;
  pracInfoEmail: string;
  pracInfoPhoneNumber: string;

  pracFacilityName: string;
  pracFacilityNumber: string;
  pracFacilityAddress: string;
  pracFacilityCity: string;
  pracFacilityProvince: string;
  pracFacilityPostalCode: string;
  pracFacilityFax: string;

  pracAttachmentType: string;
  pracAttachmentEffectiveDate: string;
  pracAttachmentCancellationDate: string;

  signature: CommonImage;
}
