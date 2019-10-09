import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

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

  constructor() {
    if (environment.bypassModal) {
      this.informationCollectionNoticeConsent = true;
    }

    if (environment.useDummyData){
      this.facAdminFirstName = 'John';
      this.facAdminLastName = 'Smith';
      this.pracNumber = '12345';
      this.emailAddress = 'a@example.com';
      this.confirmEmailAddress = 'a@example.com';
      this.facAdminPhoneNumber = '250-555-5555';

    }
  }
}
