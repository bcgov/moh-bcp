import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CreateFacilityDataService {

  // Home
  informationCollectionNoticeConsent: boolean;
  // Facility Administrator
  facAdminFirstName: string;
  facAdminLastName: string;
  pracNumber = '';
  emailAddress: string;
  confirmEmailAddress: string;
  facAdminPhoneNumber: string;
  facAdminExtension: string;

  //#region Facility Info

  // Following code is as per directions by Adam ref:bcp-68 18/10/2019 10:40AM

  // facility info
  facInfoFacilityName: string;
  facInfoPhysicalAddress: string;
  facInfoCity: string;
  facInfoProvince: string;
  facInfoPostalCode: string;
  facInfoPhoneNumber: string;
  facInfoFaxNumber: string;
  facInfoEffectiveDate: string;
  facInfoIsSameMailingAddress: boolean;
  facInfoIsQualifyForBCP: boolean;

  // mailing info
  facInfoMailAddress: string;
  facInfoMailCity: string;
  facInfoMailProvince: string;
  facInfoMailPostalCode: string

  //#endregion

  constructor() {
    if (environment.bypassModal) {
      this.informationCollectionNoticeConsent = true;
    }

    if (environment.useDummyData) {
      this.facAdminFirstName = 'John';
      this.facAdminLastName = 'Smith';
      this.pracNumber = '12345';
      this.emailAddress = 'a@example.com';
      this.confirmEmailAddress = 'a@example.com';
      this.facAdminPhoneNumber = '250-555-5555';

      // Following code is as per directions by Adam ref:bcp-68 18/10/2019 10:40AM
      // facility      
      this.facInfoFacilityName = 'Dr. Doe Medical Clinic';
      this.facInfoPhysicalAddress = '12345 Douglas Street';
      this.facInfoCity = 'Victoria';
      this.facInfoProvince = 'British Columbia';
      this.facInfoPostalCode = 'V8J 8J8';
      this.facInfoPhoneNumber = '250-555-1234';
      this.facInfoFaxNumber = '250-555-6666';
      this.facInfoEffectiveDate = 'April 15, 2020';
      this.facInfoIsSameMailingAddress = false;
      this.facInfoIsQualifyForBCP = true;
      // mailing info
      this.facInfoMailAddress = '12345 Carson Street';
      this.facInfoMailCity = 'Victoria';
      this.facInfoMailProvince = 'British Columbia';
      this.facInfoMailPostalCode = 'V8J 8J8'
    }
  }

}
