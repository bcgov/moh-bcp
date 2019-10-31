import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import format from 'date-fns/format';
import { UUID } from 'angular2-uuid';



@Injectable({
  providedIn: 'root'
})
export class CreateFacilityDataService {

  applicationUUID: string = UUID.UUID();

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
  // facInfoPhoneNumber: string;
  // facInfoPhoneExtension: string;
  facInfoFaxNumber: string;
  facInfoEffectiveDate: Date;
  facInfoIsSameMailingAddress: boolean;
  facInfoIsQualifyForBCP: boolean;

  // mailing info
  facInfoMailAddress: string;
  facInfoMailCity: string;
  facInfoMailProvince: string;
  facInfoMailPostalCode: string

  // review page
  // TODO: We must set this when user clicks the Declaration checkbox on the Review page.
  dateOfDeclaration: Date;

  //#endregion

  constructor() {
    if (environment.bypassModal) {
      this.informationCollectionNoticeConsent = true;
    }

    if (environment.useDummyData) {
      // Name and PracNumber will pass backend validation in TEST
      this.facAdminFirstName = 'Harry';
      this.facAdminLastName = 'Potter';
      this.pracNumber = '22278';
      this.emailAddress = 'a@example.com';
      this.confirmEmailAddress = 'a@example.com';
      this.facAdminPhoneNumber = '(250) 555-5555';

      // Following code is as per directions by Adam ref:bcp-68 18/10/2019 10:40AM
      // facility      
      this.facInfoFacilityName = 'Dr. Doe Medical Clinic';
      this.facInfoPhysicalAddress = '12345 Douglas Street';
      this.facInfoCity = 'Victoria';
      this.facInfoProvince = 'British Columbia';
      this.facInfoPostalCode = 'V8J 8J8';
      // this.facInfoPhoneNumber = '(250) 555-1234';
      // this.facInfoPhoneExtension = '444'
      this.facInfoFaxNumber = '(250) 555-6666';
      this.facInfoEffectiveDate = new Date(2020, 4, 15);

      this.facInfoIsSameMailingAddress = false;
      this.facInfoIsQualifyForBCP = true;
      // mailing info
      this.facInfoMailAddress = '12345 Carson Street';
      this.facInfoMailCity = 'Victoria';
      this.facInfoMailProvince = 'British Columbia';
      this.facInfoMailPostalCode = 'V8J 8J8'
      
      // Review page
      this.dateOfDeclaration = new Date();
    }
  }

  // Potentially abstract formatting into separate service if it grows beyond this method
  formatDate(inputDate): string {
    return format(inputDate, 'MMMM dd, yyyy');
  }

}
